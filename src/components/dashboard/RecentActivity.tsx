"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "book_progress",
    title: "Updated progress on 'Atomic Habits'",
    time: "2 hours ago",
    icon: "📚",
  },
  {
    id: 2,
    type: "goal_completed",
    title: "Completed weekly meditation goal",
    time: "5 hours ago",
    icon: "🎯",
  },
  {
    id: 3,
    type: "reflection",
    title: "Added daily reflection",
    time: "Yesterday",
    icon: "✍️",
  },
  {
    id: 4,
    type: "mentor_meeting",
    title: "Meeting with Sarah Johnson",
    time: "2 days ago",
    icon: "👥",
  },
]

export function RecentActivity() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 rounded-md border p-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              {activity.icon}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 