"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { planningConfig } from '@/config/planning'

export function PlanningNav() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'overview'

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {planningConfig.tabs.map((item) => {
        const Icon = item.icon
        const isActive = currentTab === item.tab

        return (
          <Button
            key={item.tab}
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => router.push(`/dashboard/planning?tab=${item.tab}`)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Button>
        )
      })}
    </nav>
  )
}