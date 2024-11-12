"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { navigation } from "./Header"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Handle smooth scroll
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Handle page navigation
      router.push(href)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("md:hidden", className)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Menu</SheetTitle>
          <SheetClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>
        
        <div className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </div>

        <div className="mt-auto border-t pt-4 absolute bottom-8 left-6 right-6">
          {session ? (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                onClick={() => router.push('/signup')}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}