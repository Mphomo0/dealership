import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  try {
    // Get all unique makes
    const makes = await prisma.inventory.findMany({
      select: {
        make: true,
      },
      distinct: ['make'],
      orderBy: {
        make: 'asc',
      },
    })

    // Get all unique models
    const models = await prisma.inventory.findMany({
      select: {
        model: true,
      },
      distinct: ['model'],
      orderBy: {
        model: 'asc',
      },
    })

    // Get all unique years
    const years = await prisma.inventory.findMany({
      select: {
        year: true,
      },
      distinct: ['year'],
      orderBy: {
        year: 'desc',
      },
    })

    // Get price ranges
    const priceRange = await prisma.inventory.aggregate({
      _min: {
        vatPrice: true,
      },
      _max: {
        vatPrice: true,
      },
    })

    const filterOptions = {
      makes: makes.map((item) => item.make).filter(Boolean),
      models: models.map((item) => item.model).filter(Boolean),
      years: years.map((item) => item.year).filter(Boolean),
      priceRanges: {
        min: priceRange._min.vatPrice || 0,
        max: priceRange._max.vatPrice || 0,
      },
    }

    return NextResponse.json(filterOptions, { status: 200 })
  } catch (error) {
    console.error('Filter options fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch filter options',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
