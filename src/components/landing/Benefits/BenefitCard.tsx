"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BenefitCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  delay: number
}

export function BenefitCard({ title, description, icon: Icon, gradient, delay }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
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
          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-lg transition-colors duration-300" />
        </motion.div>
      </Card>
    </motion.div>
  )
}