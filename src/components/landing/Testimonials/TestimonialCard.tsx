"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  content: string
  author: {
    name: string
    role: string
    image: string
  }
  delay: number
}

export function TestimonialCard({ content, author, delay }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="relative p-6 h-full bg-white dark:bg-gray-800 overflow-hidden group">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-purple-200 dark:text-gray-700">
            <Quote size={48} />
          </div>

          {/* Content */}
          <div className="relative">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              "{content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="object-cover"
                />
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {author.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {author.role}
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-lg transition-colors duration-300" />
        </motion.div>
      </Card>
    </motion.div>
  )
}