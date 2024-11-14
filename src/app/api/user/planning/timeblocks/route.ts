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

    const timeBlocks = await prisma.timeBlock.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        goal: true
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    // Format the time blocks for FullCalendar
    const events = timeBlocks.map(block => ({
      id: block.id,
      title: block.title,
      start: block.startTime.toISOString(),
      end: block.endTime.toISOString(),
      goalId: block.goalId,
      isCompleted: block.isCompleted,
      // Add custom styling based on completion status
      className: block.isCompleted ? 'completed-event' : 'pending-event'
    }))

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching time blocks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time blocks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()
    const { title, startTime, endTime, goalId, isCompleted } = json

    const timeBlock = await prisma.timeBlock.create({
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        goalId: goalId || null,
        isCompleted: isCompleted || false,
        userId: session.user.id
      }
    })

    return NextResponse.json(timeBlock)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create time block' },
      { status: 500 }
    )
  }
}