'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Filter, SlidersHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Timeline, Priority, GoalStatus } from '@prisma/client'
import { useToast } from '@/hooks/use-toast'
import GoalDialog from './GoalDialog'
import GoalCard from './GoalCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

interface FilterState {
  timelines: Timeline[]
  priorities: Priority[]
  roles: string[]
}

export function GoalsList() {
  const { toast } = useToast()
  const [goals, setGoals] = useState<Goal[]>([])
  const [roles, setRoles] = useState<{ id: string; title: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<GoalStatus>('IN_PROGRESS')
  const [filters, setFilters] = useState<FilterState>({
    timelines: [],
    priorities: [],
    roles: [],
  })

  useEffect(() => {
    fetchGoals()
    fetchRoles()
  }, [activeTab])

  const fetchGoals = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/user/planning/goals?status=${activeTab}`)
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch goals",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/user/planning/roles')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }

  const filteredGoals = goals.filter(goal => {
    const timelineMatch = filters.timelines.length === 0 || filters.timelines.includes(goal.timeline)
    const priorityMatch = filters.priorities.length === 0 || filters.priorities.includes(goal.priority)
    const roleMatch = filters.roles.length === 0 || filters.roles.includes(goal.roleId)
    return timelineMatch && priorityMatch && roleMatch
  })

  const timelineOptions = [
    { value: Timeline.TEN_YEARS, label: '10 Year Goals' },
    { value: Timeline.FIVE_YEARS, label: '5 Year Goals' },
    { value: Timeline.ONE_YEAR, label: '1 Year Goals' },
    { value: Timeline.ONE_MONTH, label: '1 Month Goals' },
    { value: Timeline.ONE_WEEK, label: '1 Week Goals' },
    { value: Timeline.TODAY, label: 'Today' },
  ]

  const priorityOptions = [
    { value: Priority.IMPORTANT_URGENT, label: 'Important & Urgent' },
    { value: Priority.IMPORTANT_NOT_URGENT, label: 'Important, Not Urgent' },
    { value: Priority.NOT_IMPORTANT_URGENT, label: 'Not Important, Urgent' },
    { value: Priority.NOT_IMPORTANT_NOT_URGENT, label: 'Not Important or Urgent' },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Goals</h3>
        <div className="flex items-center gap-2">
          {/* Filters Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Timeline</DropdownMenuLabel>
              {timelineOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.timelines.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setFilters(prev => ({
                      ...prev,
                      timelines: checked
                        ? [...prev.timelines, option.value]
                        : prev.timelines.filter(t => t !== option.value)
                    }))
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              {priorityOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.priorities.includes(option.value)}
                  onCheckedChange={(checked) => {
                    setFilters(prev => ({
                      ...prev,
                      priorities: checked
                        ? [...prev.priorities, option.value]
                        : prev.priorities.filter(p => p !== option.value)
                    }))
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Roles</DropdownMenuLabel>
              {roles.map((role) => (
                <DropdownMenuCheckboxItem
                  key={role.id}
                  checked={filters.roles.includes(role.id)}
                  onCheckedChange={(checked) => {
                    setFilters(prev => ({
                      ...prev,
                      roles: checked
                        ? [...prev.roles, role.id]
                        : prev.roles.filter(r => r !== role.id)
                    }))
                  }}
                >
                  {role.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as GoalStatus)}>
        <TabsList>
          <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Goals Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[200px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={fetchGoals}
            />
          ))}
          {filteredGoals.length === 0 && (
            <div className="col-span-full text-center p-8 text-muted-foreground">
              {goals.length === 0 ? (
                <p>No goals found. Create your first goal to get started!</p>
              ) : (
                <p>No goals match your current filters.</p>
              )}
            </div>
          )}
        </div>
      )}

      <GoalDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSaved={fetchGoals}
      />
    </div>
  )
}