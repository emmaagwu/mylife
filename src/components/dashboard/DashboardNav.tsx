"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { dashboardConfig } from "@/config/dashboard"
import type { SidebarNavItem } from "@/config/dashboard"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Menu } from "lucide-react"

export function DashboardNav() {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="ml-2 px-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileNav items={dashboardConfig.sidebarNav} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed z-30 w-64 h-screen border-r bg-background">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Dashboard
              </h2>
              <nav className="space-y-1">
                <DesktopNav items={dashboardConfig.sidebarNav} />
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function DesktopNav({ items }: { items: SidebarNavItem[] }) {
  const path = usePathname()

  return (
    <TooltipProvider>
      <div className="space-y-1">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                {item.items && (
                  <TooltipContent side="right" align="center">
                    <div className="space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-2 py-1 text-sm"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

function MobileNav({
  items,
  setIsOpen,
}: {
  items: SidebarNavItem[]
  setIsOpen: (open: boolean) => void
}) {
  const path = usePathname()

  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="flex flex-col space-y-3">
        {items.map((item, index) => (
          <MobileNavItem key={index} item={item} setIsOpen={setIsOpen} />
        ))}
      </div>
    </ScrollArea>
  )
}

function MobileNavItem({
  item,
  setIsOpen,
}: {
  item: SidebarNavItem
  setIsOpen: (open: boolean) => void
}) {
  const path = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = item.icon

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-x-2 text-sm font-medium",
          path === item.href ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => setIsOpen(false)}
      >
        <Icon className="h-4 w-4" />
        {item.title}
      </Link>
      {item.items && (
        <div className="mt-2 space-y-2 pl-6">
          {item.items.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href={subItem.href}
              className={cn(
                "block text-sm",
                path === subItem.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => setIsOpen(false)}
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 