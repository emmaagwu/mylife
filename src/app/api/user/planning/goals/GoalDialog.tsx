'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import SmartGoalGuide from './SmartGoalGuide'
import { Timeline, Priority } from '@prisma/client'

interface Role {
  id: string
  title: string
  color: string | null
  isArchived: boolean
}

interface Goal {
  id: string
  title: string
  description: string | null
  roleId: string
  timeline: Timeline
  priority: Priority
  deadline: Date | null
}

interface GoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal?: Goal
  onSaved: () => void
}

export default function GoalDialog({
  open,
  onOpenChange,
  goal,
  onSaved
}: GoalDialogProps) {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSmartGuide, setShowSmartGuide] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roleId: '',
    timeline: Timeline.ONE_YEAR as Timeline,
    priority: Priority.IMPORTANT_NOT_URGENT as Priority,
    deadline: null as Date | null,
  })

  useEffect(() => {
    if (open) {
      fetchRoles()
      if (goal) {
        setFormData({
          title: goal.title,
          description: goal.description || '',
          roleId: goal.roleId,
          timeline: goal.timeline,
          priority: goal.priority,
          deadline: goal.deadline,
        })
      } else {
        setFormData({
          title: '',
          description: '',
          roleId: '',
          timeline: Timeline.ONE_YEAR,
          priority: Priority.IMPORTANT_NOT_URGENT,
          deadline: null,
        })
      }
    }
  }, [open, goal])

  const fetchRoles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/user/planning/roles')
      const data = await response.json()
      setRoles(data.filter((role: Role) => !role.isArchived))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSaving) return

    try {
      setIsSaving(true)
      const url = goal 
        ? `/api/user/planning/goals/${goal.id}`
        : '/api/user/planning/goals'
      
      const response = await fetch(url, {
        method: goal ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save goal')

      toast({
        title: "Success",
        description: `Goal ${goal ? 'updated' : 'created'} successfully`,
      })
      
      onSaved()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${goal ? 'update' : 'create'} goal`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const timelineOptions = [
    { value: Timeline.TEN_YEARS, label: '10 Year Goal' },
    { value: Timeline.FIVE_YEARS, label: '5 Year Goal' },
    { value: Timeline.ONE_YEAR, label: '1 Year Goal' },
    { value: Timeline.ONE_MONTH, label: '1 Month Goal' },
    { value: Timeline.ONE_WEEK, label: '1 Week Goal' },
    { value: Timeline.TODAY, label: 'Today' },
  ]

  const priorityOptions = [
    { value: Priority.IMPORTANT_URGENT, label: 'Important & Urgent' },
    { value: Priority.IMPORTANT_NOT_URGENT, label: 'Important, Not Urgent' },
    { value: Priority.NOT_IMPORTANT_URGENT, label: 'Not Important, Urgent' },
    { value: Priority.NOT_IMPORTANT_NOT_URGENT, label: 'Not Important or Urgent' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {goal ? 'Edit Goal' : 'Create New Goal'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="roleId">Role</Label>
            {roles.length === 0 && !isLoading ? (
              <div className="text-sm text-muted-foreground">
                <p>No roles found. You need to create a role first.</p>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto font-normal text-primary"
                  onClick={() => {
                    // TODO: Implement role creation dialog
                  }}
                >
                  Create a new role
                </Button>
              </div>
            ) : (
              <Select
                value={formData.roleId}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, roleId: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem 
                      key={role.id} 
                      value={role.id}
                      className="flex items-center gap-2"
                    >
                      {role.color && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: role.color }}
                        />
                      )}
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Timeline Selection */}
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline</Label>
            <Select
              value={formData.timeline}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, timeline: value as Timeline }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelineOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SMART Goal Title */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="title">Goal Title</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSmartGuide(!showSmartGuide)}
              >
                SMART Goal Tips
              </Button>
            </div>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, title: e.target.value }))               
              }
              placeholder="Enter a SMART goal"
              required
            />
            {showSmartGuide && <SmartGoalGuide />}
          </div>


          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
              placeholder="Break down your goal into specific steps or add more details"
              rows={3}
            />
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, priority: value as Priority }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="flex items-center gap-2"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      {
                        'bg-red-500': option.value === 'IMPORTANT_URGENT',
                        'bg-yellow-500': option.value === 'IMPORTANT_NOT_URGENT',
                        'bg-blue-500': option.value === 'NOT_IMPORTANT_URGENT',
                        'bg-gray-500': option.value === 'NOT_IMPORTANT_NOT_URGENT',
                      }
                    )} />
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Deadline Selection */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? format(formData.deadline, "PPP") : "Set deadline"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.deadline || undefined}
                  onSelect={(date) => 
                    setFormData(prev => ({ ...prev, deadline: date || null }))
                  }
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSaving || isLoading || roles.length === 0}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {goal ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              goal ? 'Update Goal' : 'Create Goal'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}