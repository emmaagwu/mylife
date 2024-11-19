'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

interface TimeBlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTimeBlockSaved: () => void
  startDate?: Date
  endDate?: Date
  timeBlock?: {
    id: string
    title: string
    start: string
    end: string
    isCompleted: boolean
  }
}

export default function TimeBlockDialog({
  open,
  onOpenChange,
  onTimeBlockSaved,
  startDate,
  endDate,
  timeBlock
}: TimeBlockDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    isCompleted: false
  })

  useEffect(() => {
    if (timeBlock) {
      setFormData({
        title: timeBlock.title,
        startTime: new Date(timeBlock.start).toISOString().slice(0, 16),
        endTime: new Date(timeBlock.end).toISOString().slice(0, 16),
        isCompleted: timeBlock.isCompleted
      })
    } else if (startDate && endDate) {
      setFormData(prev => ({
        ...prev,
        startTime: startDate.toISOString().slice(0, 16),
        endTime: endDate.toISOString().slice(0, 16)
      }))
    }
  }, [timeBlock, startDate, endDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      
      const url = timeBlock 
        ? `/api/user/planning/timeblocks/${timeBlock.id}`
        : '/api/user/planning/timeblocks'
      
      const method = timeBlock ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isCompleted: formData.isCompleted
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save time block')
      }
      
      toast({
        title: "Success",
        description: `Time block ${timeBlock ? 'updated' : 'created'} successfully`,
      })
      
      onTimeBlockSaved()
      onOpenChange(false)
      setFormData({
        title: '',
        startTime: '',
        endTime: '',
        isCompleted: false
      })
    } catch (error) {
      console.error('Error saving time block:', error)
      toast({
        title: "Error",
        description: `Failed to ${timeBlock ? 'update' : 'create'} time block`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {timeBlock ? 'Edit Time Block' : 'Create Time Block'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
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

          {timeBlock && (
            <div className="flex items-center space-x-2">
              <Switch
                id="isCompleted"
                checked={formData.isCompleted}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isCompleted: checked }))
                }
              />
              <Label htmlFor="isCompleted">Mark as completed</Label>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : timeBlock ? 'Update' : 'Create'} Time Block
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}