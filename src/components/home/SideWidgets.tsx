"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Bell, ListTodo } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Event, Notification } from "@/types/home"

interface SideWidgetsProps {
  events?: Event[];
  notifications?: Notification[];
  isLoading: boolean;
}

export function SideWidgets({ events = [], notifications = [], isLoading }: SideWidgetsProps) {
  console.log('Events:', events);
  console.log('Notifications:', notifications);

  const quickActions = [
    {
      title: "Add Journal Entry",
      icon: ListTodo
    },
    // Add more quick actions
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" />
          <h3 className="font-semibold">Upcoming Events</h3>
        </div>
        {Array.isArray(events) && events.map((event) => (
          <div key={event.id} className="mb-3">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        ))}
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        {Array.isArray(notifications) && notifications.map((notification) => (
          <div key={notification.id} className="mb-3">
            <p className="font-medium">{notification.message}</p>
            <p className="text-sm text-muted-foreground">{notification.time}</p>
          </div>
        ))}
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <action.icon className="h-4 w-4" />
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}