'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RolesList from './roles/RolesList'
import GoalsList from './goals/GoalsList'
import GoalStats from './goals/GoalStats'
import TimeBlockCalendar from './timeblocks/TimeBlockCalendar'
import { CalendarDays, CheckCircle2, Target, Users } from 'lucide-react'
import { usePlanning } from '@/contexts/PlanningContext'
import { Progress } from '@/components/ui/progress'
export default function PlanningDashboard() {
  const { roles, goals } = usePlanning()

  const activeRoles = roles.filter(r => !r.isArchived)
  const goalsInProgress = goals.filter(g => g.status === 'IN_PROGRESS')
  const completedGoals = goals.filter(g => g.status === 'COMPLETED')
  const upcomingDeadlines = goals.filter(g => 
    g.deadline && 
    new Date(g.deadline) > new Date() && 
    g.status !== 'COMPLETED'
  ).slice(0, 5)

  return (
    <div className="flex-1 space-y-4">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRoles.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals In Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goalsInProgress.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedGoals.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Goals Progress */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Goals Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goalsInProgress.slice(0, 5).map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{goal.title}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} />
                  </div>
                ))}
                {goalsInProgress.length === 0 && (
                  <div className="text-center text-muted-foreground">
                    No goals in progress
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map(goal => (
                    <div key={goal.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{goal.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(goal.deadline!).toLocaleDateString()}
                        </p>
                      </div>
                      {goal.role && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: goal.role.color || undefined }}
                        />
                      )}
                    </div>
                  ))}
                  {upcomingDeadlines.length === 0 && (
                    <div className="text-center text-muted-foreground">
                      No upcoming deadlines
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <RolesList />
        </TabsContent>

        <TabsContent value="goals">
          <GoalsList />
          <GoalStats />
        </TabsContent>

        <TabsContent value="calendar">
          <TimeBlockCalendar />
        </TabsContent>
      </Tabs>
    </div>
  )
}