"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Quote, Target, Compass, Heart, Lightbulb } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import type { CoreIdentityData } from "@/types/home"

interface CoreIdentityProps {
  data: CoreIdentityData;
  isLoading: boolean;
}

export function CoreIdentity({ data, isLoading }: CoreIdentityProps) {
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-[200px] w-full" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[180px]" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    router.push('/dashboard/identity')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Core Identity</h2>
        <Button variant="outline" onClick={handleEdit} className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Identity
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Statement Card - Featured */}
        <Card className="p-6 border-2 border-purple-500/20 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
              <Quote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Identity Statement</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {data.statement || "Define your identity statement in the dashboard →"}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Values Card */}
          <Card className="p-6 border-2 border-blue-500/20 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {data.values?.length > 0 ? (
                    data.values.map((value) => (
                      <span
                        key={value}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {value}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Define your core values →</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Mission Card */}
          <Card className="p-6 border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.mission || "Define your mission →"}
                </p>
              </div>
            </div>
          </Card>

          {/* Vision Card */}
          <Card className="p-6 border-2 border-amber-500/20 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.vision || "Define your vision →"}
                </p>
              </div>
            </div>
          </Card>

          {/* Purpose Card */}
          <Card className="p-6 border-2 border-rose-500/20 bg-gradient-to-br from-rose-50 to-transparent dark:from-rose-950/20">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-rose-100 dark:bg-rose-900/30">
                <Compass className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Purpose</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.purpose || "Define your purpose →"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 