"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, LinkedinIcon, Twitter } from "lucide-react"

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Strategy",
    image: "/mentors/sarah.jpg",
    email: "sarah.j@example.com",
    linkedin: "sarahjohnson",
    twitter: "sarahj",
    expertise: ["Leadership", "Strategic Planning", "Business Growth"],
  },
  // Add more mentors...
]

export function MentorList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <Card key={mentor.id}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mentor.image} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground">{mentor.role}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-secondary px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 