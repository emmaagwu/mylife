import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'
import { Timeline, Priority, GoalStatus } from '@prisma/client'

// GET all goals
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get status from query params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as GoalStatus || 'IN_PROGRESS'

    const goals = await prisma.goal.findMany({
      where: {
        userId: session.user.id,
        status,
      },
      include: {
        role: {
          select: {
            title: true,
            color: true,
          },
        },
      },
      orderBy: [
        {
          deadline: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    })

    return NextResponse.json(goals)
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    )
  }
}

// POST new goal
export async function POST(request: Request) {
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

    // Validate role exists and belongs to user
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
        userId: session.user.id,
      },
    })

    if (!role) {
      return NextResponse.json(
        { error: 'Invalid role selected' },
        { status: 400 }
      )
    }

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        roleId,
        timeline,
        priority,
        deadline: deadline ? new Date(deadline) : null,
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

    return NextResponse.json(goal)
  } catch (error) {
    console.error('Error creating goal:', error)
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    )
  }
}