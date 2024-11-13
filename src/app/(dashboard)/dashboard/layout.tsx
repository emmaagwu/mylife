"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <DashboardNav />

      {/* Main content */}
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}