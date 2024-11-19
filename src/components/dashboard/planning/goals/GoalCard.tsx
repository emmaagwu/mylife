'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Timeline, Priority, GoalStatus } from '@prisma/client'
import { format } from 'date-fns'
import { 
  MoreVertical, 
  Edit2, 
  Archive, 
  Trash2, 
  CheckCircle2,
  Calendar,
  Flag,
  RotateCcw
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import GoalDialog from './GoalDialog'
import { cn } from '@/lib/utils'

interface Goal {
  id: string
  title: string
  description: string | null
  roleId: string
  timeline: Timeline
  priority: Priority
  deadline: Date | null
  status: GoalStatus
  progress: number
  role: {
    title: string
    color: string | null
  }
}

interface GoalCardProps {
  goal: Goal
  onUpdate: () => void
}

export default function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: GoalStatus) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/user/planning/goals/${goal.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update goal status')

      toast({
        title: "Success",
        description: `Goal marked as ${newStatus.toLowerCase().replace('_', ' ')}`,
      })
      
      onUpdate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update goal status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleProgressUpdate = async (newProgress: number) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/user/planning/goals/${goal.id}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: newProgress }),
      })

      if (!response.ok) throw new Error('Failed to update progress')

      toast({
        title: "Success",
        description: `Progress updated to ${newProgress}%`,
      })
      
      onUpdate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getTimelineLabel = (timeline: Timeline) => {
    const labels = {
      [Timeline.TEN_YEARS]: '10 Year Goal',
      [Timeline.FIVE_YEARS]: '5 Year Goal',
      [Timeline.ONE_YEAR]: '1 Year Goal',
      [Timeline.ONE_MONTH]: '1 Month Goal',
      [Timeline.ONE_WEEK]: '1 Week Goal',
      [Timeline.TODAY]: 'Today'
    }
    return labels[timeline]
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      [Priority.IMPORTANT_URGENT]: 'bg-red-500',
      [Priority.IMPORTANT_NOT_URGENT]: 'bg-yellow-500',
      [Priority.NOT_IMPORTANT_URGENT]: 'bg-blue-500',
      [Priority.NOT_IMPORTANT_NOT_URGENT]: 'bg-gray-500'
    }
    return colors[priority]
  }

  return (
    <>
      <Card className={cn(
        "relative",
        goal.status === 'COMPLETED' && "bg-muted",
        goal.status === 'ARCHIVED' && "opacity-75"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {goal.role.color && (
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: goal.role.color }}
                  />
                )}
                <span className="text-sm text-muted-foreground">
                  {goal.role.title}
                </span>
              </div>
              <h4 className="font-semibold leading-tight">{goal.title}</h4>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                
                {goal.status !== 'COMPLETED' && (
                  <DropdownMenuItem 
                    onClick={() => handleStatusUpdate('COMPLETED')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </DropdownMenuItem>
                )}
                
                {goal.status === 'COMPLETED' && (
                  <DropdownMenuItem 
                    onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reopen Goal
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                
                {goal.status !== 'ARCHIVED' ? (
                  <DropdownMenuItem 
                    onClick={() => handleStatusUpdate('ARCHIVED')}
                    className="text-destructive"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Goal
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore Goal
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          {goal.description && (
            <p className="text-sm text-muted-foreground">
              {goal.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {getTimelineLabel(goal.timeline)}
            </div>
            
            {goal.deadline && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Flag className="h-4 w-4" />
                Due {format(new Date(goal.deadline), 'MMM d, yyyy')}
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                getPriorityColor(goal.priority)
              )} />
              <span className="text-xs text-muted-foreground">
                {goal.priority.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
            {goal.status === 'IN_PROGRESS' && (
              <div className="flex justify-between gap-2 mt-2">
                {[0, 25, 50, 75, 100].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleProgressUpdate(value)}
                    disabled={isUpdating}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>

      <GoalDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        goal={goal}
        onSaved={onUpdate}
      />
    </>
  )
}