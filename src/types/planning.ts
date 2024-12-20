// import { 
//   Timeline as PrismaTimeline, 
//   Priority, 
//   GoalStatus as PrismaGoalStatus, 
//   Goal as PrismaGoal, 
//   Role as PrismaRole, 
//   TimeBlock as PrismaTimeBlock 
// } from '@prisma/client'

// export interface Role {
//   id: string
//   userId: string
//   title: string
//   description?: string | null
//   icon?: string | null
//   color?: string | null
//   isArchived: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// export interface Goal {
//   id: string
//   userId: string
//   roleId: string
//   title: string
//   description?: string | null
//   timeline: Timeline
//   priority: Priority
//   deadline?: Date | null
//   status: GoalStatus
//   progress: number
//   isArchived: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// export interface TimeBlock {
//   id: string
//   userId: string
//   goalId?: string | null
//   title: string
//   description?: string | null
//   startTime: Date
//   endTime: Date
//   isCompleted: boolean
//   isRecurring: boolean
//   recurrence?: string | null
//   createdAt: Date
//   updatedAt: Date
// }


// export interface RecurrenceRule {
//   frequency: 'daily' | 'weekly' | 'monthly';
//   interval?: number;
//   endDate?: Date;
//   daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
//   exceptions?: Date[]; // Dates when recurring event doesn't occur
// }

// export interface DateRange {
//   start: Date;
//   end: Date;
// }

// export interface TimeBlockConflict {
//   existingBlock: TimeBlock;
//   conflictType: 'overlap' | 'adjacent' | 'contained';
// }

// export interface BulkTimeBlockOperation {
//   originalId?: string;
//   dates: Date[];
//   operation: 'create' | 'update' | 'delete';
//   timeBlockData?: Partial<TimeBlock>;
// }

// export interface TimeBlockWithRelations extends TimeBlock {
//   goal?: Goal & {
//     role: Role
//   }
// }

// export interface GoalWithRelations extends Goal {
//   role: Role
//   timeBlocks: TimeBlock[]
// }

// export interface RoleWithRelations extends Role {
//   goals: Goal[]
// }


// export type TimeBlockCreateInput = Omit<TimeBlock, 'id' | 'createdAt' | 'updatedAt'>;

// export type TimeBlockOperation = {
//   type: 'CREATE' | 'UPDATE' | 'DELETE'
//   timeBlock: Partial<TimeBlock>
//   recurrence?: RecurrenceRule
// }

// export type GoalStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'

// export type GoalPriority = 
//   | 'IMPORTANT_URGENT'
//   | 'IMPORTANT_NOT_URGENT'
//   | 'NOT_IMPORTANT_URGENT'
//   | 'NOT_IMPORTANT_NOT_URGENT'

// export type Timeline = 
//   | 'TODAY'
//   | 'THIS_WEEK'
//   | 'THIS_MONTH'
//   | 'THIS_QUARTER'
//   | 'THIS_YEAR'
//   | 'LONG_TERM'


import { 
  Timeline as PrismaTimeline, 
  Priority, 
  GoalStatus as PrismaGoalStatus, 
  Goal as PrismaGoal, 
  Role as PrismaRole, 
  TimeBlock as PrismaTimeBlock 
} from '@prisma/client'

// Use Prisma-generated Role type directly
export type Role = PrismaRole

// Extend Prisma's Goal type instead of redefining it
export interface Goal extends PrismaGoal {
  timeline: PrismaTimeline // Retain custom mapping for Timeline if needed
}

// Extend Prisma's TimeBlock type
export interface TimeBlock extends PrismaTimeBlock {}

// Extend Prisma's Goal type with additional relations
export interface GoalWithRelations extends PrismaGoal {
  role: Role // Use PrismaRole for consistency
  timeBlocks: TimeBlock[] // Use PrismaTimeBlock
}

// Extend Prisma's Role type with additional relations
export interface RoleWithRelations extends PrismaRole {
  goals: Goal[] // Use PrismaGoal
}

// Use Prisma's GoalStatus directly
export type GoalStatus = PrismaGoalStatus

// Use Prisma's Priority and Timeline enums directly
export type Timeline = PrismaTimeline
export type GoalPriority = Priority

// Other custom types remain unchanged if they don't rely on Prisma
export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval?: number;
  endDate?: Date;
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  exceptions?: Date[]; // Dates when recurring event doesn't occur
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeBlockConflict {
  existingBlock: TimeBlock;
  conflictType: 'overlap' | 'adjacent' | 'contained';
}

export interface BulkTimeBlockOperation {
  originalId?: string;
  dates: Date[];
  operation: 'create' | 'update' | 'delete';
  timeBlockData?: Partial<TimeBlock>;
}

export interface TimeBlockWithRelations extends TimeBlock {
  goal?: GoalWithRelations; // Ensure relations are consistent
}

export type TimeBlockCreateInput = Omit<TimeBlock, 'id' | 'createdAt' | 'updatedAt'>;

export type TimeBlockOperation = {
  type: 'CREATE' | 'UPDATE' | 'DELETE'
  timeBlock: Partial<TimeBlock>
  recurrence?: RecurrenceRule
}
