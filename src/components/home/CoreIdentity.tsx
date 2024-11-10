"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton" // You'll need to create this
import { CoreIdentityData } from "@/types/home"

interface CoreIdentityProps {
  data: CoreIdentityData | null;
  isLoading: boolean;
}

export function CoreIdentity({ data, isLoading }: CoreIdentityProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-8" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Core Identity</h2>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Identity Statement</h3>
          <p className="text-muted-foreground">{data.statement}</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Core Values</h3>
          <div className="flex flex-wrap gap-2">
            {data.values?.map((value) => (
              <span
                key={value}
                className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-md text-sm"
              >
                {value}
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Mission Statement</h3>
          <p className="text-muted-foreground">{data.mission}</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Life Purpose</h3>
          <p className="text-muted-foreground">{data.purpose}</p>
        </Card>
      </div>
    </div>
  )
} 