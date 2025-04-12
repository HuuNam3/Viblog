"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ShowMoreTextProps {
  text: string
  maxLength?: number
  className?: string
}

export function ShowMoreText({ text, maxLength = 150, className = "" }: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = text.length > maxLength
  const displayText = shouldTruncate && !isExpanded ? `${text.slice(0, maxLength)}...` : text

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={className}>
      <p className="whitespace-pre-wrap">{displayText}</p>
      {shouldTruncate && (
        <Button variant="link" onClick={toggleExpanded} className="mt-1 c text-white h-auto p-0 text-sm font-medium">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  )
}
