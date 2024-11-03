"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, UserPlus, Target, LineChart, Trophy, CheckCircle2} from "lucide-react"

const steps = [
  {
    title: "Create your account",
    description: "Start with a free account and upgrade anytime",
    illustration: (
      <div className="relative w-full h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* Profile Card */}
            <motion.div
              className="w-64 h-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <UserPlus className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2 mx-auto" />
              </div>
              <div className="mt-auto w-full">
                <div className="h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg" />
              </div>
            </motion.div>
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                rotate: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
            >
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Set your first goal",
    description: "Define what success looks like for you",
    illustration: (
      <div className="relative w-full h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Goal Setting Interface */}
          <div className="relative">
            <motion.div
              className="w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-2/3" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-5/6" />
                </div>
                <div className="h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg" />
              </div>
            </motion.div>
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                rotate: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"
            >
              <div className="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Track your progress",
    description: "Watch your daily improvements add up",
    illustration: (
      <div className="relative w-full h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Progress Chart */}
          <div className="relative">
            <motion.div
              className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <LineChart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div className="space-x-2">
                    <motion.div 
                      className="inline-block w-3 h-3 rounded-full bg-purple-600"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="inline-block w-3 h-3 rounded-full bg-blue-600"
                      animate={{ scale: [1.2, 1, 1.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
                <div className="h-40 flex items-end justify-between gap-2">
                  {[40, 70, 45, 90, 60, 80, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-8 bg-gradient-to-t from-purple-600 to-blue-600 rounded-t-lg"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Achieve results",
    description: "Celebrate your successes and plan your next goals",
    illustration: (
      <div className="relative w-full h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Achievement Showcase */}
          <div className="relative">
            <motion.div
              className="w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-6">
                <div className="flex justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2 mx-auto" />
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -5, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity
                      }}
                      className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
]

export function OnboardingSection() {
  return (
    <section className="py-24 relative">
      {/* Background with diagonal gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 transform -skew-y-6" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">
              Start Your Journey in
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Minutes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Four simple steps to transform your life
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-600 to-blue-600" />

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}>
                    {/* Content */}
                    <div className={`w-1/2 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>

                    {/* Circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-purple-600 z-10">
                      <span className="text-xl font-bold text-purple-600">
                        {index + 1}
                      </span>
                    </div>

                    {/* Illustration Placeholder */}
                    <div className="w-1/2 h-48 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-600">
                        {/* Illustration {index + 1} */}
                        {step.illustration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
