"use client"

import { Bell, Search, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardHeaderProps {
  children?: React.ReactNode
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  const { data: session } = useSession()
  const userInitials = session?.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('')
    : 'U'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-3 md:px-4">
        {/* Left Section - Aligned with other elements */}
        <div className="flex items-center gap-2 h-full">
          <div className="flex items-center h-full">
            {children}
          </div>
          <Link href="/home" className="font-semibold text-lg hidden md:block">
            MyLife
          </Link>
        </div>

        {/* Center Section - Search (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center max-w-xl px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full pl-9 pr-4"
            />
          </div>
        </div>

        {/* Right Section - Compact spacing on mobile */}
        <div className="flex items-center space-x-1.5 md:space-x-2 h-full">
          {/* Mobile Search */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-full">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="px-4 py-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-full pl-9 pr-4"
                  autoFocus
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Home Link - Always visible */}
          <Link href="/home">
            <Button variant="ghost" size="icon" className="relative">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          {/* Notifications - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>New achievement unlocked!</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Daily reflection reminder</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>New message from mentor</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle - Hidden on mobile */}
          <ThemeToggle className="hidden sm:flex" />

          {/* User Menu - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ""} alt="Avatar" />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}