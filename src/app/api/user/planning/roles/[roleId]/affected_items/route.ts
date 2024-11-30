import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ roleId: string }>
  }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const roleId = (await params).roleId;

    // Fetch goals and their tasks
    const goals = await prisma.goal.findMany({
      where: {
        roleId: roleId,
        userId: session.user.id,
      },
      include: {
        tasks: true,
      },
    })

    // Format the response
    const affectedItems = [
      ...goals.map(goal => ({
        type: 'goal' as const,
        title: goal.title,
        status: goal.status,
      })),
      ...goals.flatMap(goal => 
        goal.tasks.map(task => ({
          type: 'task' as const,
          title: task.title,
          status: task.status,
        }))
      ),
    ]

    return NextResponse.json(affectedItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch affected items' },
      { status: 500 }
    )
  }
}