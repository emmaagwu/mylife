"use client"

import { Suspense } from "react"
import { IdentityTabs } from "@/components/identity/IdentityTabs"
import { SaveButton } from "@/components/identity/SaveButton"
import { Button } from "@/components/ui/button"

export default function IdentityPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Core Identity</h2>
          <p className="text-muted-foreground mt-2">
            Define who you are and what you stand for
          </p>
        </div>
        <Suspense fallback={<Button disabled>Saving...</Button>}>
          <SaveButton />
        </Suspense>
      </div>

      <Suspense 
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <IdentityTabs />
      </Suspense>
    </div>
  )
}
