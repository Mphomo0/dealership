import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import slugify from 'slugify'

interface Filters {
  make?: string
  model?: string
  year?: number
  vatPrice?: {
    gte?: number
    lte?: number
  }
  OR?: Array<{
    make?: { contains: string; mode: 'insensitive' }
    model?: { contains: string; mode: 'insensitive' }
  }>
}

// POST /api/vehicles to create a new vehicle
export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const {
      name,
      make,
      model,
      year,
      vatPrice,
      pricenoVat,
      mileage,
      fuelType,
      condition,
      transmission,
      images,
      description,
    } = body

    const requiredFields = [
      name,
      make,
      model,
      year,
      vatPrice,
      pricenoVat,
      condition,
      description,
    ]

    if (requiredFields.some((field) => field === undefined || field === '')) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      )
    }

    if (
      !images.every(
        (img) => typeof img.url === 'string' && typeof img.fileId === 'string'
      )
    ) {
      return NextResponse.json(
        { error: 'Each image must have a valid url and fileId' },
        { status: 400 }
      )
    }

    // Parse numeric values
    const parsedYear = parseInt(year)
    const parsedVatPrice = parseFloat(vatPrice)
    const parsedPricenoVat = parseFloat(pricenoVat)
    const parsedMileage =
      mileage !== undefined && mileage !== null ? parseFloat(mileage) : null

    if (
      isNaN(parsedYear) ||
      isNaN(parsedVatPrice) ||
      isNaN(parsedPricenoVat) ||
      isNaN(parsedMileage ?? 0)
    ) {
      return NextResponse.json(
        { error: 'Year, price, and mileage must be valid numbers' },
        { status: 400 }
      )
    }

    const upperFuelType =
      fuelType !== undefined && fuelType !== null
        ? fuelType.toUpperCase()
        : null

    const upperTransmission =
      transmission !== undefined && transmission !== null
        ? transmission.toUpperCase()
        : null

    // Normalize enum values
    const upperCondition = condition.toUpperCase()

    // Convert make and model to lowercase before saving
    const lowerMake = make.toLowerCase()
    const lowerModel = model.toLowerCase()

    // Generate unique slug
    const baseSlug = slugify(`${make}-${model}-${year}`, { lower: true })
    let slug = baseSlug
    let counter = 1
    while (await prisma.inventory.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    // Create vehicle in the database
    const newVehicle = await prisma.inventory.create({
      data: {
        name,
        make: lowerMake,
        model: lowerModel,
        year: parsedYear,
        vatPrice: parsedVatPrice,
        pricenoVat: parsedPricenoVat,
        mileage: parsedMileage,
        fuelType: upperFuelType,
        condition: upperCondition,
        transmission: upperTransmission,
        description,
        slug,
        images,
      },
    })

    return NextResponse.json(newVehicle, { status: 201 })
  } catch (error) {
    console.error('Vehicle creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
})

// GET /api/vehicles to fetch all vehicles
export const GET = async (req: NextRequest) => {
  try {
    // No authentication needed for fetching vehicles
    const { searchParams } = new URL(req.url)

    const page = Number.parseInt(searchParams.get('page') || '1', 10)
    const limit = Number.parseInt(searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit

    // Filter parameters
    const make = searchParams.get('make')
    const model = searchParams.get('model')
    const year = searchParams.get('year')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

    const validSortFields = ['createdAt', 'vatPrice', 'year', 'mileage']
    const validOrder = ['asc', 'desc']

    const sortBy = validSortFields.includes(sort) ? sort : 'createdAt'
    const sortOrder = validOrder.includes(order) ? order : 'desc'

    // Build filters object
    const filters: Filters = {}

    if (make && make !== 'all') {
      filters.make = { equals: make, mode: 'insensitive' } as any
    }

    if (model && model !== 'all') {
      filters.model = { equals: model, mode: 'insensitive' } as any
    }

    const yearNumber = Number.parseInt(year || '')
    if (!isNaN(yearNumber)) filters.year = yearNumber

    // Handle search term (searches both make and model)
    if (search) {
      filters.OR = [
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ]
      // Remove individual make/model filters when searching
      delete filters.make
      delete filters.model
    }

    // Handle price filtering
    if (minPrice || maxPrice) {
      filters.vatPrice = {}

      if (minPrice) {
        const min = Number.parseFloat(minPrice)
        if (!isNaN(min)) {
          filters.vatPrice.gte = min
        }
      }

      if (maxPrice && maxPrice !== 'plus') {
        const max = Number.parseFloat(maxPrice)
        if (!isNaN(max)) {
          filters.vatPrice.lte = max
        }
      }
    }

    // Convert price filter to vatPrice for Prisma
    if (filters.vatPrice) {
      filters.vatPrice = filters.vatPrice
      delete filters.vatPrice
    }

    const total = await prisma.inventory.count({ where: filters })

    const vehicles = await prisma.inventory.findMany({
      skip,
      take: limit,
      where: filters,
      orderBy: {
        [sortBy]: sortOrder,
      },
    })

    return NextResponse.json(
      {
        vehicles,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Vehicle fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch vehicles',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
