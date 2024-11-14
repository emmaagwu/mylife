import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        status: true,
        progress: true,
        timeline: true,
        priority: true,
      },
    })

    const stats = {
      total: goals.length,
      completed: goals.filter(g => g.status === 'COMPLETED').length,
      inProgress: goals.filter(g => g.status === 'IN_PROGRESS').length,
      archived: goals.filter(g => g.status === 'ARCHIVED').length,
      averageProgress: Math.round(
        goals.reduce((acc, g) => acc + g.progress, 0) / goals.length || 0
      ),
      byTimeline: {
        TEN_YEARS: goals.filter(g => g.timeline === 'TEN_YEARS').length,
        FIVE_YEARS: goals.filter(g => g.timeline === 'FIVE_YEARS').length,
        ONE_YEAR: goals.filter(g => g.timeline === 'ONE_YEAR').length,
        ONE_MONTH: goals.filter(g => g.timeline === 'ONE_MONTH').length,
        ONE_WEEK: goals.filter(g => g.timeline === 'ONE_WEEK').length,
        TODAY: goals.filter(g => g.timeline === 'TODAY').length,
      },
      byPriority: {
        IMPORTANT_URGENT: goals.filter(g => g.priority === 'IMPORTANT_URGENT').length,
        IMPORTANT_NOT_URGENT: goals.filter(g => g.priority === 'IMPORTANT_NOT_URGENT').length,
        NOT_IMPORTANT_URGENT: goals.filter(g => g.priority === 'NOT_IMPORTANT_URGENT').length,
        NOT_IMPORTANT_NOT_URGENT: goals.filter(g => g.priority === 'NOT_IMPORTANT_NOT_URGENT').length,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching goal stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goal statistics' },
      { status: 500 }
    )
  }
}