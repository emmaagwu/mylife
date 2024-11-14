'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import DeleteRoleValidation from './DeleteRoleValidation'

interface AffectedItem {
  type: 'goal' | 'task'
  title: string
  status: string
}

interface DeleteRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: {
    id: string
    title: string
  }
  onDelete: () => void
}

export default function DeleteRoleDialog({
  open,
  onOpenChange,
  role,
  onDelete
}: DeleteRoleDialogProps) {
  const { toast } = useToast()
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [affectedItems, setAffectedItems] = useState<AffectedItem[]>([])
  const isValid = confirmText === role.title

  // Fetch affected items when dialog opens
  useEffect(() => {
    if (open) {
      fetchAffectedItems()
    } else {
      setConfirmText('')
      setAffectedItems([])
      setIsLoading(true)
    }
  }, [open, role.id])

  const fetchAffectedItems = async () => {
    try {
      const response = await fetch(`/api/user/planning/roles/${role.id}/affected-items`)
      if (!response.ok) throw new Error('Failed to fetch affected items')
      const data = await response.json()
      setAffectedItems(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch affected items",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isValid) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/user/planning/roles/${role.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete role')

      toast({
        title: "Role Deleted",
        description: `Successfully archived "${role.title}" and ${affectedItems.length} associated items`,
      })
      
      onDelete()
      onOpenChange(false)
    } catch (error) {
      console.error('Error deleting role:', error)
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive flex items-center gap-2">
            Delete Role: {role.title}
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            {/* Warning Message */}
            <p className="text-destructive font-semibold">
              This action cannot be undone. This will permanently archive this role
              and all associated items.
            </p>

            {/* Affected Items Preview */}
            {!isLoading && (
              <div className="rounded-md border p-4 space-y-3">
                <h4 className="font-medium">Items that will be affected:</h4>
                {affectedItems.length > 0 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Goals ({
                          affectedItems.filter(item => item.type === 'goal').length
                        })</h5>
                        <ul className="text-sm space-y-1">
                          {affectedItems
                            .filter(item => item.type === 'goal')
                            .map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                }`} />
                                {item.title}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Tasks ({
                          affectedItems.filter(item => item.type === 'task').length
                        })</h5>
                        <ul className="text-sm space-y-1">
                          {affectedItems
                            .filter(item => item.type === 'task')
                            .map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                }`} />
                                {item.title}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No goals or tasks are associated with this role.
                  </p>
                )}
              </div>
            )}

            {/* Confirmation Input */}
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Type <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{role.title}</span> to confirm
              </Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type "${role.title}" to confirm`}
                className={`${!isValid && confirmText ? 'border-destructive' : ''}`}
              />
              
              {/* Validation Feedback */}
              {confirmText && (
                <DeleteRoleValidation 
                  inputText={confirmText} 
                  targetText={role.title} 
                />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isValid || isDeleting || isLoading}
            className={`bg-destructive hover:bg-destructive/90 ${
              (!isValid || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              `Delete Role${affectedItems.length ? ` and ${affectedItems.length} items` : ''}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}