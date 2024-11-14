import { useState, useCallback } from 'react'
import { TimeBlockWithRelations, TimeBlockOperation } from '@/types/planning'
import { useToast } from './use-toast'

export function useTimeBlocks() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlockWithRelations[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchTimeBlocks = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/planning/timeblocks')
      const data = await response.json()
      setTimeBlocks(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch time blocks',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const handleTimeBlockOperation = useCallback(async (operation: TimeBlockOperation) => {
    try {
      let response
      switch (operation.type) {
        case 'CREATE':
          response = await fetch('/api/user/planning/timeblocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(operation.timeBlock),
          })
          break
        case 'UPDATE':
          response = await fetch(`/api/user/planning/timeblocks/${operation.timeBlock.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(operation.timeBlock),
          })
          break
        case 'DELETE':
          response = await fetch(`/api/user/planning/timeblocks/${operation.timeBlock.id}`, {
            method: 'DELETE',
          })
          break
      }

      if (!response?.ok) throw new Error('Operation failed')
      
      await fetchTimeBlocks()
      
      toast({
        title: 'Success',
        description: `Time block ${operation.type.toLowerCase()}d successfully`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${operation.type.toLowerCase()} time block`,
        variant: 'destructive',
      })
    }
  }, [fetchTimeBlocks, toast])

  return {
    timeBlocks,
    isLoading,
    fetchTimeBlocks,
    handleTimeBlockOperation,
  }
}