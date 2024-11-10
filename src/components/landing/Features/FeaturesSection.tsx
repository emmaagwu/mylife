"use client"

import { motion } from "framer-motion"
import { FeatureCard } from "./FeatureCard"
import { 
  Target, 
  BookOpen, 
  Brain, 
  Calendar, 
  Quote, 
  Users,
  BarChart,
  Settings,
  Sparkles 
} from "lucide-react"

const features = [
  {
    title: "Goal Tracking",
    description: "Set, track, and achieve your personal and professional goals with our intuitive tracking system.",
    icon: Target,
    gradient: "from-purple-500 to-blue-500"
  },
  {
    title: "Personal Library",
    description: "Build your knowledge base with books, articles, and resources that matter to you.",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Vision Board",
    description: "Visualize your dreams and aspirations with our interactive vision board feature.",
    icon: Brain,
    gradient: "from-cyan-500 to-green-500"
  },
  {
    title: "Life Planning",
    description: "Plan your life journey with our comprehensive calendar and milestone tracking.",
    icon: Calendar,
    gradient: "from-green-500 to-yellow-500"
  },
  {
    title: "Inspiration Hub",
    description: "Store and organize your favorite quotes, ideas, and inspirational content.",
    icon: Quote,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Mentor Network",
    description: "Connect with and learn from mentors who align with your goals.",
    icon: Users,
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Progress Analytics",
    description: "Track your growth with detailed analytics and progress reports.",
    icon: BarChart,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Customization",
    description: "Personalize your experience with themes, layouts, and preferences.",
    icon: Settings,
    gradient: "from-pink-500 to-purple-500"
  },
  {
    title: "AI Integration",
    description: "Get intelligent insights and recommendations for your personal growth.",
    icon: Sparkles,
    gradient: "from-purple-500 to-blue-500"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> 
              {" "}Transform Your Life
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Powerful features designed to help you track, plan, and achieve your personal development goals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 