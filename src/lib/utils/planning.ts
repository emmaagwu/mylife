import { addDays, addWeeks, addMonths, isSameDay } from 'date-fns'
import { TimeBlock, Goal, Role } from '@prisma/client'

export type RecurrencePattern = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export function generateRecurringDates(
  startDate: Date,
  pattern: RecurrencePattern,
  count: number
): Date[] {
  const dates: Date[] = []
  let currentDate = new Date(startDate)

  for (let i = 0; i < count; i++) {
    dates.push(new Date(currentDate))
    
    switch (pattern) {
      case 'DAILY':
        currentDate = addDays(currentDate, 1)
        break
      case 'WEEKLY':
        currentDate = addWeeks(currentDate, 1)
        break
      case 'MONTHLY':
        currentDate = addMonths(currentDate, 1)
        break
    }
  }

  return dates
}

export function checkTimeBlockConflicts(
  startTime: Date,
  endTime: Date,
  existingBlocks: TimeBlock[],
  excludeId?: string
): TimeBlock[] {
  return existingBlocks.filter(block => {
    if (block.id === excludeId) return false
    
    return (
      (startTime < new Date(block.endTime) && endTime > new Date(block.startTime))
    )
  })
}

export function calculateGoalProgress(
  goal: Goal & { timeBlocks: TimeBlock[] }
): number {
  const completedBlocks = goal.timeBlocks.filter(block => block.isCompleted).length
  const totalBlocks = goal.timeBlocks.length
  
  if (totalBlocks === 0) return 0
  return Math.round((completedBlocks / totalBlocks) * 100)
}

export function groupTimeBlocksByGoal(
  timeBlocks: (TimeBlock & { goal?: Goal & { role: Role } })[]
): Record<string, TimeBlock[]> {
  return timeBlocks.reduce((acc, block) => {
    const goalId = block.goalId || 'unassigned'
    if (!acc[goalId]) {
      acc[goalId] = []
    }
    acc[goalId].push(block)
    return acc
  }, {} as Record<string, TimeBlock[]>)
}