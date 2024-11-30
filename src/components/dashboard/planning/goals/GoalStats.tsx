'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Loader2, Target, Clock, Flag } from 'lucide-react'
import { Timeline, Priority } from '@prisma/client'

interface GoalStats {
  total: number
  completed: number
  inProgress: number
  archived: number
  averageProgress: number
  byTimeline: Record<Timeline, number>
  byPriority: Record<Priority, number>
}

const timelineLabels: Record<Timeline, string> = {
  TEN_YEARS: '10 Years',
  FIVE_YEARS: '5 Years',
  ONE_YEAR: '1 Year',
  ONE_MONTH: '1 Month',
  ONE_WEEK: '1 Week',
  TODAY: 'Today',
}

const priorityColors: Record<Priority, string> = {
  IMPORTANT_URGENT: '#ef4444',
  IMPORTANT_NOT_URGENT: '#f59e0b',
  NOT_IMPORTANT_URGENT: '#3b82f6',
  NOT_IMPORTANT_NOT_URGENT: '#6b7280',
}

export function GoalStats() {
  const [stats, setStats] = useState<GoalStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/user/planning/goals/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch goal stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!stats) return null

  const timelineData = Object.entries(stats.byTimeline).map(([key, value]) => ({
    name: timelineLabels[key as Timeline],
    goals: value,
  }))

  const priorityData = Object.entries(stats.byPriority).map(([key, value]) => ({
    name: key.replace(/_/g, ' '),
    value,
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Overview Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-muted-foreground">
            {stats.inProgress} in progress
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Flag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round((stats.completed / stats.total) * 100) || 0}%
          </div>
          <Progress 
            value={stats.averageProgress} 
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Timeline Distribution */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Timeline Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timelineData}>
              <XAxis 
                dataKey="name" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar 
                dataKey="goals" 
                fill="currentColor" 
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {priorityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={priorityColors[entry.name.replace(/ /g, '_') as Priority]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}