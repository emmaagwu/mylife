// "use client"

// import { useState } from "react"
// import { DashboardNav } from "@/components/dashboard/DashboardNav"
// import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
// import { Sheet, SheetContent } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

//   return (
//     <div className="relative min-h-screen flex">
//       {/* Desktop Sidebar - hidden on mobile */}
//       <div className="hidden md:flex w-64 flex-none fixed inset-y-0 z-50">
//         <DashboardNav />
//       </div>

//       {/* Mobile Navigation Sheet */}
//       <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
//         <SheetContent side="left" className="w-64 p-0">
//           <DashboardNav />
//         </SheetContent>
//       </Sheet>

//       {/* Main content - responsive margin */}
//       <div className="flex-1 md:ml-64">
//         <DashboardHeader>
//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setIsMobileNavOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </Button>
//         </DashboardHeader>
        
//         <main className="p-4 md:p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      {/* Navigation - handles both mobile and desktop */}
      <DashboardNav />

      {/* Main content */}
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}