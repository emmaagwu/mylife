import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/authoptions';

export async function PATCH(
  request: NextRequest,
  context: { params: { goalId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { progress } = body as { progress: number };

    // Validate progress value
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Progress must be a number between 0 and 100' },
        { status: 400 }
      );
    }
    

    // Verify goal exists and belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id: context.params.goalId,
        userId: session.user.id,
      },
    });

    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: context.params.goalId,
      },
      data: {
        progress,
        // If progress is 100%, automatically mark as completed
        status: progress === 100 ? 'COMPLETED' : goal.status,
      },
      include: {
        role: {
          select: {
            title: true,
            color: true,
          },
        },
      },
    });

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal progress:', error);
    return NextResponse.json(
      { error: 'Failed to update goal progress' },
      { status: 500 }
    );
  }
}
