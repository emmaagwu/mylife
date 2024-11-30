'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import RoleCard from './RoleCard'
import AddRoleDialog from './AddRoleDialog'
import { usePlanning } from '@/contexts/PlanningContext'

export function RolesList() {
  const { roles, fetchRoles } = usePlanning()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Life Roles</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <RoleCard 
            key={role.id} 
            role={role} 
            onUpdate={fetchRoles}
          />
        ))}
        {roles.length === 0 && (
          <div className="col-span-full text-center p-8 text-muted-foreground">
            No roles defined yet. Add your first role to get started!
          </div>
        )}
      </div>

      <AddRoleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onRoleAdded={fetchRoles}
      />
    </div>
  )
}