import { RecurrenceRule, TimeBlockConflict } from "@/types/planning";
import { TimeBlock } from "@prisma/client";
import { prisma } from "@/lib/prisma";


export function isOverlapping(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && end1 > start2;
}

export function generateRecurringDates(
  startDate: Date,
  recurrenceRule: RecurrenceRule
): Date[] {
  const dates: Date[] = [];
  const endDate = recurrenceRule.endDate || new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days default

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (recurrenceRule.daysOfWeek) {
      if (recurrenceRule.daysOfWeek.includes(currentDate.getDay())) {
        dates.push(new Date(currentDate));
      }
    } else {
      dates.push(new Date(currentDate));
    }

    switch (recurrenceRule.frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + (recurrenceRule.interval || 1));
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7 * (recurrenceRule.interval || 1));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + (recurrenceRule.interval || 1));
        break;
    }
  }

  return dates.filter(date => 
    !recurrenceRule.exceptions?.some(exception => 
      date.toDateString() === new Date(exception).toDateString()
    )
  );
}

export async function checkConflicts(
  userId: string,
  startTime: Date,
  endTime: Date
): Promise<TimeBlockConflict[]> {
  const existingBlocks: TimeBlock[] = await prisma.timeBlock.findMany({
    where: {
      userId,
      OR: [
        {
          startTime: {
            lte: endTime,
          },
          endTime: {
            gte: startTime,
          },
        },
      ],
    },
  });

  return existingBlocks.map((block: TimeBlock) => ({
    existingBlock: block,
    conflictType: 
      block.startTime >= startTime && block.endTime <= endTime ? 'contained' :
      block.startTime <= startTime && block.endTime >= endTime ? 'contained' :
      Math.abs(block.endTime.getTime() - startTime.getTime()) < 1000 * 60 * 15 ? 'adjacent' :
      'overlap',
  }));
}