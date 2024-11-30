'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users, Target, CheckCircle2, Calendar } from 'lucide-react'
import type { GoalWithRelations, RoleWithRelations } from '@/types/planning'
import { GoalProgressCard } from './goals/GoalProgressCard'
import { format } from 'date-fns'

export function PlanningOverview() {
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
      
      if (!rolesRes.ok || !goalsRes.ok) {
        throw new Error('Failed to fetch planning data')
      }

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

  const upcomingDeadlines = goals
    .filter(g => g.status === 'IN_PROGRESS' && g.deadline)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.filter(r => !r.isArchived).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals In Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.filter(g => g.status === 'IN_PROGRESS').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.filter(g => g.status === 'COMPLETED').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Goal Progress</h2>
          <div className="grid gap-4">
            {goals
              .filter(g => g.status === 'IN_PROGRESS')
              .map(goal => (
                <GoalProgressCard key={goal.id} goal={goal} />
              ))
            }
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Upcoming Deadlines</h2>
          <div className="grid gap-4">
            {upcomingDeadlines.map(goal => (
              <Card key={goal.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Due {format(new Date(goal.deadline!), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      {goal.role && (
                        <>
                          {goal.role.color && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: goal.role.color }}
                            />
                          )}
                          <span className="text-sm text-muted-foreground">
                            {goal.role.title}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingDeadlines.length === 0 && (
              <Card>
                <CardContent className="py-4 text-center text-sm text-muted-foreground">
                  No upcoming deadlines
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}