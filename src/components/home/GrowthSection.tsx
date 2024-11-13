"use client"

import { Card } from "@/components/ui/card"
import { Book, Trophy, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface GrowthSectionProps {
  data: any; // We'll properly type this later
  isLoading: boolean;
}

export function GrowthSection({ data, isLoading }: GrowthSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Growth Journey</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5" />
            <h3 className="font-semibold">Current Reads</h3>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5" />
            <h3 className="font-semibold">Recent Achievements</h3>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h3 className="font-semibold">Mentors & Role Models</h3>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </Card>
      </div>
    </div>
  )
}