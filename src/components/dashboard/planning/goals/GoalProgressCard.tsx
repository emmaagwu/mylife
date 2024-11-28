import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { GoalWithRelations } from '@/types/planning'
import { calculateGoalProgress } from '@/lib/utils/planning'

interface GoalProgressCardProps {
  goal: GoalWithRelations
}

export default function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const progress = calculateGoalProgress(goal)
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: goal.role.color || '#ccc'}} 
            />
            <h3 className="font-medium">{goal.title}</h3>
          </div>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 text-sm text-muted-foreground">
          {goal.timeBlocks.filter(b => b.isCompleted).length} of {goal.timeBlocks.length} tasks completed
        </div>
      </CardContent>
    </Card>
  )
}