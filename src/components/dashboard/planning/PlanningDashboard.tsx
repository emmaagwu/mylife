'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlanningOverview } from './PlanningOverview'
import { RolesList } from './roles/RolesList'
import { GoalsList } from './goals/GoalsList'
import { GoalStats } from './goals/GoalStats'
import { TimeBlockCalendar } from './timeblocks/TimeBlockCalendar'
import { planningConfig } from '@/config/planning'
import type { PlanningTab } from '@/config/planning'
import { usePlanning } from '@/contexts/PlanningContext'

export default function PlanningDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = (searchParams.get('tab') as PlanningTab) || 'overview'
  const { roles, goals } = usePlanning()

  const handleTabChange = (value: string) => {
    router.push(`/dashboard/planning?tab=${value}`)
  }

  return (
    <div className="flex-1 space-y-4">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          {planningConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.tab} value={tab.tab}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <PlanningOverview />
        </TabsContent>

        <TabsContent value="roles">
          <RolesList />
        </TabsContent>

        <TabsContent value="goals">
          <GoalsList />
          <GoalStats />
        </TabsContent>

        <TabsContent value="calendar">
          <TimeBlockCalendar />
        </TabsContent>
      </Tabs>
    </div>
  )
}