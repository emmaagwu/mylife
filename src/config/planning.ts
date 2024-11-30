import { Calendar, Target, Users, LayoutDashboard } from "lucide-react"

export type PlanningTab = "overview" | "roles" | "goals" | "calendar"

export interface PlanningItem {
  title: string
  tab: PlanningTab
  icon: typeof Calendar | typeof Target | typeof Users | typeof LayoutDashboard
  description: string
}

export const planningConfig: { tabs: readonly PlanningItem[] } = {
  tabs: [
    {
      title: "Overview",
      tab: "overview",
      icon: LayoutDashboard,
      description: "View all your plans and goals",
    },
    {
      title: "Roles",
      tab: "roles",
      icon: Users,
      description: "Manage your roles and responsibilities",
    },
    {
      title: "Goals",
      tab: "goals",
      icon: Target,
      description: "Set and track your goals",
    },
    {
      title: "Calendar",
      tab: "calendar",
      icon: Calendar,
      description: "View and manage your calendar",
    },
  ],
}
