"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { Sparkles, BarChart3, Users, ArrowRight } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"



// Shared navigation config
export const navigation = [
  { 
    name: "Features", 
    href: "#features",
    icon: Sparkles,
    description: "Discover what makes us special"
  },
  { 
    name: "Benefits", 
    href: "#benefits",
    icon: BarChart3,
    description: "See how we can help you grow"
  },
  { 
    name: "Testimonials", 
    href: "#testimonials",
    icon: Users,
    description: "What others say about us"
  },
  { 
    name: "Get Started", 
    href: "#onboarding",
    icon: ArrowRight,
    description: "Begin your journey today"
  }
]

export function Header() {
  const { data: session } = useSession()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MyLife
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <MobileMenu className="md:hidden" />
          {session ? (
            <>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex"
                onClick={() => signOut()}
              >
                Log out
              </Button>
              <Button 
                className="hidden md:inline-flex"
                asChild
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button 
                  className="hidden md:inline-flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  )
}