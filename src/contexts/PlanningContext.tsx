'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Role {
  id: string
  title: string
  isArchived: boolean
  description: string | null
  color: string | null
}

interface Goal {
  id: string
  title: string
  status: string
  progress: number
  role: Role
  deadline: Date | null
}

interface PlanningContextType {
  roles: Role[]
  goals: Goal[]
  fetchRoles: () => Promise<void>
  fetchGoals: () => Promise<void>
}

const PlanningContext = createContext<PlanningContextType | undefined>(undefined)

export function PlanningProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<Role[]>([])
  const [goals, setGoals] = useState<Goal[]>([])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/user/planning/roles')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/user/planning/goals')
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  useEffect(() => {
    fetchRoles()
    fetchGoals()
  }, [])

  return (
    <PlanningContext.Provider value={{ roles, goals, fetchRoles, fetchGoals }}>
      {children}
    </PlanningContext.Provider>
  )
}

export function usePlanning() {
  const context = useContext(PlanningContext)
  if (context === undefined) {
    throw new Error('usePlanning must be used within a PlanningProvider')
  }
  return context
} 