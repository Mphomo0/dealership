import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

interface UpdateSpecialsBody {
  amount: number
  validFrom: string
  validTo: string
  inventoryId: string
  slug: string
}

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params

  try {
    const special = await prisma.specials.findUnique({
      where: { slug },
      include: {
        inventory: true,
      },
    })

    if (!special) {
      return NextResponse.json({ error: 'Special not found' }, { status: 404 })
    }

    return NextResponse.json({ special }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export const DELETE = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await ctx.params // Get id from the URL params

  try {
    // Attempt to delete the special by ID
    const special = await prisma.specials.delete({
      where: { slug },
    })

    // If the special is not found, this will throw and be caught below
    if (!special) {
      return NextResponse.json({ error: 'Special not found' }, { status: 404 })
    }

    // If successful, return a success response
    return NextResponse.json(
      { message: 'Special deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    // Handle errors (e.g., invalid ID, database errors, etc.)
    return NextResponse.json(
      { error: 'Server error or invalid ID' },
      { status: 500 }
    )
  }
})

// PATCH /api/specials/slug to update a special by ID
export const PATCH = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await ctx.params

  try {
    const body: UpdateSpecialsBody = await req.json()

    if (!body.amount || !body.validFrom || !body.validTo || !body.inventoryId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: amount, validFrom, validTo, inventoryId',
        },
        { status: 400 }
      )
    }

    const existingSpecial = await prisma.specials.findUnique({
      where: { slug },
    })

    if (!existingSpecial) {
      return NextResponse.json({ error: 'Special not found' }, { status: 404 })
    }

    const inventoryExists = await prisma.inventory.findUnique({
      where: { id: body.inventoryId },
    })

    if (!inventoryExists) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      )
    }

    const validFrom = new Date(body.validFrom)
    const validTo = new Date(body.validTo)

    if (validFrom >= validTo) {
      return NextResponse.json(
        { error: 'validFrom must be before validTo' },
        { status: 400 }
      )
    }

    const updateData = {
      amount: body.amount,
      validFrom: validFrom,
      validTo: validTo,
      inventoryId: body.inventoryId,
    }

    const updatedSpecial = await prisma.specials.update({
      where: { slug },
      data: updateData,
      include: { inventory: true },
    })

    return NextResponse.json({ updatedSpecial }, { status: 200 })
  } catch (error) {
    console.error('Error updating special:', error)

    if (error instanceof Error) {
      if (error.message.includes('Record to update does not exist')) {
        return NextResponse.json(
          { error: 'Special not found' },
          { status: 404 }
        )
      }

      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Invalid inventory reference' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
})
