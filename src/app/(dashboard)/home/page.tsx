"use client"

import { Header } from "@/components/home/Header"
import { CoreIdentity } from "@/components/home/CoreIdentity"
import { InspirationZone } from "@/components/home/InspirationZone"
import { GrowthSection } from "@/components/home/GrowthSection"
import { SideWidgets } from "@/components/home/SideWidgets"
import { useHomeData } from "@/hooks/useHomeData"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export default function HomePage() {
  const { 
    identity, 
    growth, 
    quotes,
    visionBoard,
    events,
    notifications,
    isLoading, 
    error 
  } = useHomeData()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-8">
            <CoreIdentity data={identity} isLoading={isLoading} />
            <InspirationZone 
              quotes={quotes}
              visionBoard={visionBoard}
              isLoading={isLoading} 
            />
            <GrowthSection data={growth} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-3">
            <SideWidgets 
              events={events}
              notifications={notifications}
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}