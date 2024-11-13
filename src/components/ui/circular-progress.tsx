import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function CircularProgress({ 
  value, 
  size = "md", 
  showValue = false,
  className 
}: CircularProgressProps) {
  const radius = size === "sm" ? 8 : size === "md" ? 12 : 16
  const strokeWidth = size === "sm" ? 2 : size === "md" ? 2.5 : 3
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }

  return (
    <div className={cn("relative inline-flex", sizeClasses[size], className)}>
      <svg className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          className="text-muted-foreground/20"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          r={radius}
          cx="50%"
          cy="50%"
        />
        {/* Progress circle */}
        <circle
          className="text-primary transition-all duration-300 ease-in-out"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx="50%"
          cy="50%"
        />
      </svg>
      {showValue && (
        <span className={cn(
          "absolute inset-0 flex items-center justify-center font-medium",
          textSizes[size]
        )}>
          {Math.round(value)}%
        </span>
      )}
    </div>
  )
} 