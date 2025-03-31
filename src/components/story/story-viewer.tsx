"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Story {
  id: number
  imageUrl: string
}

export default function StoryViewer() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Sample stories data
  const stories: Story[] = [
    { id: 1, imageUrl: "/imgs/meo.png" },
    { id: 2, imageUrl: "/imgs/meo1.png" },
    { id: 3, imageUrl: "/imgs/meo2.png" },
    { id: 4, imageUrl: "/imgs/meo3.png" },
  ]

  // Story duration in milliseconds (3 seconds)
  const storyDuration = 3000

  useEffect(() => {
    if (isPaused) return

    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 100 / (storyDuration / 100)
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    const timeout = setTimeout(() => {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex((prevIndex) => prevIndex + 1)
      }
    }, storyDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [activeStoryIndex, isPaused])

  const handleStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPosition = (clientX - left) / width

    if (clickPosition < 0.5 && activeStoryIndex > 0) {
      setActiveStoryIndex((prevIndex) => prevIndex - 1)
    } else if (clickPosition >= 0.5 && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <div className="max-w-md mx-auto border-2 border-gray-800 rounded-lg overflow-hidden">
      <div className="flex w-full h-1 bg-gray-200 gap-1 p-0">
        {stories.map((story, index) => (
          <div key={story.id} className="flex-1 h-full bg-gray-200 relative">
            {index === activeStoryIndex ? (
              <div className="absolute top-0 left-0 h-full bg-gray-800" style={{ width: `${progress}%` }} />
            ) : index < activeStoryIndex ? (
              <div className="absolute top-0 left-0 h-full w-full bg-gray-800" />
            ) : null}
          </div>
        ))}
      </div>

      <div
        className="relative aspect-[4/5] w-full"
        onClick={handleStoryClick}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <img src={stories[activeStoryIndex]?.imageUrl} alt={`Story ${stories[activeStoryIndex]?.id}`} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}