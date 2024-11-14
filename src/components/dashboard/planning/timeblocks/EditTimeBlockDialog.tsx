import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { TimeBlock, Goal } from '@prisma/client'

interface EditTimeBlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTimeBlockUpdated: () => void
  timeBlock: TimeBlock & { goal?: Goal }
}

export default function EditTimeBlockDialog({
  open,
  onOpenChange,
  onTimeBlockUpdated,
  timeBlock
}: EditTimeBlockDialogProps) {
  const { toast } = useToast()
  const [goals, setGoals] = useState<Goal[]>([])
  const [formData, setFormData] = useState({
    goalId: timeBlock.goalId || '',
    title: timeBlock.title,
    description: timeBlock.description || '',
    startTime: new Date(timeBlock.startTime).toISOString().slice(0, 16),
    endTime: new Date(timeBlock.endTime).toISOString().slice(0, 16),
    isRecurring: timeBlock.isRecurring,
    recurrence: timeBlock.recurrence || ''
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/user/planning/goals')
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`/api/user/planning/timeblocks/${timeBlock.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update time block')
      
      toast({
        title: "Success",
        description: "Time block updated successfully",
      })
      
      onTimeBlockUpdated()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update time block",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this time block?')) return

    try {
      const response = await fetch(`/api/user/planning/timeblocks/${timeBlock.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete time block')
      
      toast({
        title: "Success",
        description: "Time block deleted successfully",
      })
      
      onTimeBlockUpdated()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete time block",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Time Block</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Same form fields as AddTimeBlockDialog */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="goalId">Related Goal (Optional)</Label>
            <Select 
              value={formData.goalId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, goalId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {goals.map((goal) => (
                  <SelectItem key={goal.id} value={goal.id}>
                    {goal.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRecurring: checked }))}
            />
            <Label>Recurring Event</Label>
          </div>

          {formData.isRecurring && (
            <div>
              <Label htmlFor="recurrence">Recurrence Pattern</Label>
              <Select 
                value={formData.recurrence} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, recurrence: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">Update</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}