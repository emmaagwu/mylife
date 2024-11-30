import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { GoalWithRelations } from '@/types/planning'
import { calculateGoalProgress } from '@/lib/utils/planning'
import { format } from 'date-fns'

interface GoalProgressCardProps {
  goal: GoalWithRelations
  showRole?: boolean
  showDeadline?: boolean
}

export function GoalProgressCard({ goal, showRole = false, showDeadline = false }: GoalProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Progress value={goal.progress} className="flex-1" />
            <div className="text-sm font-medium">{goal.progress}%</div>
          </div>

          {showDeadline && goal.deadline && (
            <div className="text-sm text-muted-foreground">
              Due {format(new Date(goal.deadline), 'MMM d, yyyy')}
            </div>
          )}

          {showRole && goal.role && (
            <div className="flex items-center gap-2">
              {goal.role.color && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: goal.role.color }}
                />
              )}
              <span className="text-sm text-muted-foreground">
                {goal.role.title}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}