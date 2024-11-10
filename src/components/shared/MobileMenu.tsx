"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { navigation } from "./Header" // Import shared navigation config

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 300) // Wait for menu to close
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[400px] p-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      >
        <motion.nav 
          className="flex flex-col h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MyLife
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-4">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => handleClick(item.href)}
                    className="w-full group relative flex items-center gap-4 rounded-lg p-4 text-left text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-gray-700">
                      <item.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </span>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-500" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-6 space-y-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              className="w-full justify-center text-base"
            >
              Log in
            </Button>
            <Button 
              className="w-full justify-center text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Get Started
            </Button>
          </div>
        </motion.nav>
      </SheetContent>
    </Sheet>
  )
}