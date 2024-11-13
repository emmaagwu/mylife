import { Card } from "@/components/ui/card"
import { Sparkles, Target, TrendingUp } from "lucide-react"
import type { CoreIdentityData } from "@/types/home"
import { motion, AnimatePresence } from "framer-motion"

export function IdentityInsights({ data }: { data: CoreIdentityData }) {
  // Calculate insights based on identity data
  const hasValues = data.values.length > 0
  const hasMission = !!data.mission
  const hasVision = !!data.vision

  return (
    <AnimatePresence>
      {(hasValues || hasMission || hasVision) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6"
        >
          <Card className="p-4 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-950/20">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Identity Insights
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {hasValues && (
                <p className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" />
                  Your top value "{data.values[0]}" aligns with your {data.mission ? 'mission' : 'purpose'}.
                </p>
              )}
              {hasMission && hasVision && (
                <p className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Your mission and vision are complementary, creating a strong foundation.
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 