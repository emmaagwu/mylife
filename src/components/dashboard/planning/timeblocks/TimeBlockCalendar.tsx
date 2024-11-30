'use client'

import { useState, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import TimeBlockDialog from './TimeBlockDialog'

interface TimeBlock {
  id: string
  title: string
  start: string
  end: string
  goalId?: string
  isCompleted: boolean
}

export function TimeBlockCalendar() {
  const [events, setEvents] = useState<TimeBlock[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | null>(null)
  const [selectedDates, setSelectedDates] = useState<{start: Date, end: Date} | null>(null)
  const { toast } = useToast()

  const fetchTimeBlocks = useCallback(async () => {
    try {
      const response = await fetch('/api/user/planning/timeblocks')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch time blocks",
        variant: "destructive",
      })
    }
  }, [toast])

  useEffect(() => {
    fetchTimeBlocks()
  }, [fetchTimeBlocks])

  const handleEventClick = (info: any) => {
    setSelectedTimeBlock({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end.toISOString(),
      goalId: info.event.extendedProps.goalId,
      isCompleted: info.event.extendedProps.isCompleted
    })
    setIsDialogOpen(true)
  }

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDates({
      start: selectInfo.start,
      end: selectInfo.end
    })
    setIsDialogOpen(true)
  }

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventDisplay="block"
        longPressDelay={1}
        eventLongPressDelay={1}
        selectLongPressDelay={1}
        height="auto"
      />

      <TimeBlockDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onTimeBlockSaved={() => {
          fetchTimeBlocks()
          setSelectedTimeBlock(null)
          setSelectedDates(null)
        }}
        timeBlock={selectedTimeBlock || undefined}
        startDate={selectedDates?.start}
        endDate={selectedDates?.end}
      />
    </Card>
  )
}