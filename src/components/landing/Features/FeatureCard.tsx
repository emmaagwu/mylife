"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
}

export function FeatureCard({ title, description, icon: Icon, gradient }: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="p-6 bg-white dark:bg-gray-800 h-full"
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        {/* Hover Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-lg transition-colors duration-300" />
      </motion.div>
    </Card>
  )
}