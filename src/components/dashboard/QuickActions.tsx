"use client"

import { Button } from "@/components/ui/button"
import {
  BookOpen,
  PenTool,
  Target,
  Calendar,
  Users,
  Plus,
  BookMarked,
} from "lucide-react"

const actions = [
  {
    title: "Add Daily Reflection",
    icon: PenTool,
    href: "/dashboard/library/notes/new",
    color: "text-blue-500",
  },
  {
    title: "Set New Goal",
    icon: Target,
    href: "/dashboard/planning/new",
    color: "text-green-500",
  },
  {
    title: "Add Book",
    icon: BookOpen,
    href: "/dashboard/library/books/new",
    color: "text-purple-500",
  },
  {
    title: "Schedule Meeting",
    icon: Calendar,
    href: "/dashboard/planning/schedule",
    color: "text-orange-500",
  },
  {
    title: "Add Mentor",
    icon: Users,
    href: "/dashboard/network/mentors/new",
    color: "text-pink-500",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button
            key={index}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            asChild
          >
            <a href={action.href}>
              <Icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-sm font-medium">{action.title}</span>
            </a>
          </Button>
        )
      })}
    </div>
  )
} 