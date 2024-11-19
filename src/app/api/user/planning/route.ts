import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/authoptions'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        roles: {
          include: {
            goals: true
          }
        },
        goals: {
          include: {
            role: true,
            timeBlocks: true
          }
        }
      }
    })

    return NextResponse.json({
      roles: user?.roles || [],
      goals: user?.goals || []
    })
  } catch (error) {
    console.error('Planning data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch planning data' },
      { status: 500 }
    )
  }
}