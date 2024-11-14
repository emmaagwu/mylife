import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { GoalWithRelations, RoleWithRelations } from '@/types/planning'
import GoalProgressCard from './goals/GoalProgressCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PlanningOverview() {
  const [roles, setRoles] = useState<RoleWithRelations[]>([])
  const [goals, setGoals] = useState<GoalWithRelations[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [rolesRes, goalsRes] = await Promise.all([
        fetch('/api/user/planning/roles'),
        fetch('/api/user/planning/goals')
      ])
      
      const [rolesData, goalsData] = await Promise.all([
        rolesRes.json(),
        goalsRes.json()
      ])

      setRoles(rolesData)
      setGoals(goalsData)
    } catch (error) {
      console.error('Error fetching planning data:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>Active Roles</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {roles.filter(r => !r.isArchived).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Goals In Progress</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {goals.filter(g => g.status === 'IN_PROGRESS').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Completed Goals</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {goals.filter(g => g.status === 'COMPLETED').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Goal Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals
            .filter(g => g.status === 'IN_PROGRESS')
            .map(goal => (
              <GoalProgressCard key={goal.id} goal={goal} />
            ))
          }
        </div>
      </div>
    </div>
  )
}