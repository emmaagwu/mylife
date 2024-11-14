import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/authoptions'
import PlanningDashboard from '@/components/dashboard/planning/PlanningDashboard'
import { PlanningProvider } from '@/contexts/PlanningContext'

export const metadata: Metadata = {
  title: 'Planning & Goals',
  description: 'Manage your life roles, goals, and schedule',
}

export default async function PlanningPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <PlanningProvider>
      <PlanningDashboard />
    </PlanningProvider>
  )
}