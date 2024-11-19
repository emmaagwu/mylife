import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'

// GET single goal
export async function GET(
  request: Request,
  { params }: { params: { goalId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const goal = await prisma.goal.findFirst({
      where: {
        id: params.goalId,
        userId: session.user.id,
      },
      include: {
        role: {
          select: {
            title: true,
            color: true,
          },
        },
      },
    })

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    return NextResponse.json(goal)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch goal' },
      { status: 500 }
    )
  }
}

// PUT update goal
export async function PUT(
  request: Request,
  { params }: { params: { goalId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, roleId, timeline, priority, deadline } = body

    // Validate required fields
    if (!title || !roleId || !timeline || !priority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify goal exists and belongs to user
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id: params.goalId,
        userId: session.user.id,
      },
    })

    if (!existingGoal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: params.goalId,
      },
      data: {
        title,
        description,
        roleId,
        timeline,
        priority,
        deadline: deadline ? new Date(deadline) : null,
      },
      include: {
        role: {
          select: {
            title: true,
            color: true,
          },
        },
      },
    })

    return NextResponse.json(updatedGoal)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 }
    )
  }
}

// DELETE goal
export async function DELETE(
  request: Request,
  { params }: { params: { goalId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify goal exists and belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id: params.goalId,
        userId: session.user.id,
      },
    })

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    await prisma.goal.delete({
      where: {
        id: params.goalId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 }
    )
  }
}