import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'
import { GoalStatus } from '@prisma/client'


export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ goalId: string }>
  }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body as { status: GoalStatus }

    // Validate status
    if (!Object.values(GoalStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const goalId = (await params).goalId;

    // Verify goal exists and belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId: session.user.id,
      },
    })

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        status,
        // If marking as completed, set progress to 100%
        ...(status === 'COMPLETED' ? { progress: 100 } : {}),
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
    console.error('Error updating goal status:', error)
    return NextResponse.json(
      { error: 'Failed to update goal status' },
      { status: 500 }
    )
  }
}