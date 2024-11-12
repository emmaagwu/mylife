"use client"

import { motion } from "framer-motion"
import { TestimonialCard } from "./TestimonialCard"
import { Avatar } from "@/components/ui/avatar"

const testimonials = [
  {
    content: "MyLife has completely transformed how I approach my personal development. The interface is intuitive, and the progress tracking is incredibly motivating.",
    author: {
      name: "Sarah Chen",
      role: "Product Designer at Figma",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=250&h=250&auto=format&fit=crop"
    }
  },
  {
    content: "The goal-setting framework in MyLife is exceptional. It's helped me achieve more in 6 months than I did in the past 2 years.",
    author: {
      name: "David Kumar",
      role: "Engineering Lead at Stripe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop"
    }
  },
  {
    content: "What sets MyLife apart is its holistic approach to personal development. It's not just about tracking goals, it's about genuine life transformation.",
    author: {
      name: "Emily Rodriguez",
      role: "Life Coach & Entrepreneur",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop"
    }
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden w-full">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            Loved by
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Professionals</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of users who have transformed their lives with MyLife
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.author.name} 
              {...testimonial}
              delay={index * 0.2} 
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              50K+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Active Users</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              1M+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Goals Achieved</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              98%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Satisfaction Rate</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              4.9/5
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
          </div>
        </motion.div>

        {/* Social Proof Logos */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t"
        >
          {/* <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            TRUSTED BY TEAMS FROM
          </p> */}
          {/* <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50"> */}
            {/* Replace these with actual company logos */}
            {/* <div className="h-8 text-gray-400">Company 1</div>
            <div className="h-8 text-gray-400">Company 2</div>
            <div className="h-8 text-gray-400">Company 3</div>
            <div className="h-8 text-gray-400">Company 4</div> */}
          {/* </div> */}
        </motion.div>
      </div>
    </section>
  )
}