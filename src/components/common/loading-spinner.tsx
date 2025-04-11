"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
  dotCount?: number
}

export function LoadingSpinner({ size = "md", color = "bg-blue-500", dotCount = 8 }: LoadingSpinnerProps) {
  // Size mapping
  const sizeMap = {
    sm: {
      container: "w-8 h-8",
      dot: "w-1 h-1",
      radius: 12,
    },
    md: {
      container: "w-12 h-12",
      dot: "w-1.5 h-1.5",
      radius: 18,
    },
    lg: {
      container: "w-16 h-16",
      dot: "w-2 h-2",
      radius: 24,
    },
  }

  const { container, dot, radius } = sizeMap[size]

  // Create an array of dots based on dotCount
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const angle = (i / dotCount) * 360
    const delay = i * (0.8 / dotCount)

    return { angle, delay }
  })

  return (
    <div className={`relative ${container} flex items-center justify-center`}>
      {/* Center pulse */}
      <motion.div
        className={`absolute rounded-full ${color} opacity-30`}
        initial={{ width: 0, height: 0 }}
        animate={{
          width: ["30%", "40%", "30%"],
          height: ["30%", "40%", "30%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Rotating dots */}
      {dots.map(({ angle, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${color} ${dot}`}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * radius,
            y: Math.sin((angle * Math.PI) / 180) * radius,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
