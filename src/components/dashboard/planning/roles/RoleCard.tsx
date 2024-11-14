'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import EditRoleDialog from './EditRoleDialog'
import DeleteRoleDialog from './DeleteRoleDialog'

interface Role {
  id: string
  title: string
  description: string | null
  color: string | null
}

interface RoleCardProps {
  role: Role
  onUpdate: () => void
}

export default function RoleCard({ role, onUpdate }: RoleCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {role.color && (
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: role.color }}
                />
              )}
              <h4 className="font-semibold">{role.title}</h4>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>
        {role.description && (
          <CardContent>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </CardContent>
        )}
      </Card>

      <EditRoleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        role={role}
        onRoleUpdated={onUpdate}
      />

      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        role={role}
        onDelete={onUpdate}
      />
    </>
  )
}