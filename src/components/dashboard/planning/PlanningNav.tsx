import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const planningNavItems = [
  {
    title: "Overview",
    href: "/dashboard/planning",
  },
  {
    title: "Roles",
    href: "/dashboard/planning/roles",
  },
  {
    title: "Goals",
    href: "/dashboard/planning/goals",
  },
  {
    title: "Calendar",
    href: "/dashboard/planning/calendar",
  },
]

export function PlanningNav() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {planningNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
        >
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}