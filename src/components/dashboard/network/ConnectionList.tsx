 "use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, UserPlus } from "lucide-react"

const connections = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Product Designer",
    image: "/connections/alex.jpg",
    mutualConnections: 12,
    status: "Connected",
  },
  // Add more connections...
]

export function ConnectionList() {
  return (
    <div className="space-y-4">
      {connections.map((connection) => (
        <Card key={connection.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={connection.image} alt={connection.name} />
                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{connection.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {connection.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {connection.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}