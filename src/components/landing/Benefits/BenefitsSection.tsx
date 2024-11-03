"use client"

import { motion } from "framer-motion"
import { BenefitCard } from "./BenefitCard"
import { 
  Target, 
  LineChart, 
  Calendar, 
  Brain,
  Smile,
  TrendingUp
} from "lucide-react"

const benefits = [
  {
    title: "Goal Achievement",
    description: "Set and track meaningful goals with our proven framework for success",
    icon: Target,
    gradient: "from-blue-500 to-blue-600",
    delay: 0.2
  },
  {
    title: "Progress Tracking",
    description: "Visualize your journey with intuitive charts and progress indicators",
    icon: LineChart,
    gradient: "from-purple-500 to-purple-600",
    delay: 0.3
  },
  {
    title: "Time Management",
    description: "Master your schedule with our intelligent planning tools",
    icon: Calendar,
    gradient: "from-indigo-500 to-indigo-600",
    delay: 0.4
  },
  {
    title: "Personal Growth",
    description: "Develop new skills and habits with guided learning paths",
    icon: Brain,
    gradient: "from-pink-500 to-pink-600",
    delay: 0.5
  },
  {
    title: "Better Habits",
    description: "Build and maintain positive habits that last a lifetime",
    icon: TrendingUp,
    gradient: "from-cyan-500 to-cyan-600",
    delay: 0.6
  },
  {
    title: "Life Balance",
    description: "Achieve harmony across all areas of your life",
    icon: Smile,
    gradient: "from-emerald-500 to-emerald-600",
    delay: 0.7
  }
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            Transform Your Life with
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> MyLife</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience the benefits of a structured approach to personal development and life planning
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
} 