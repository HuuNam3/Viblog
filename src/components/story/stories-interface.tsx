"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

interface Story {
  name: string
  avatar: string
}

export default function StoriesInterface() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [stories, setStories] = useState<Story[]>([
    { name: "Alice", avatar: "/imgs/meo.png" },
    { name: "Bob", avatar: "/imgs/meo1.png" },
    { name: "Charlie", avatar: "/imgs/meo2.png" },
    { name: "David", avatar: "/imgs/meo3.png" },
  ])

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index)
  }

  const handleAddStory = () => {
    const newStory: Story = { name: `New Story ${stories.length + 1}`, avatar: "/imgs/meo.png" }
    setStories([...stories, newStory])
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      {/* When there are multiple stories */}
      <div className="mb-12 relative">
        <div className="w-full h-28 border-2 border-gray-800 rounded-lg flex items-center p-4 gap-4 overflow-x-auto">
          <div 
            className="hover:opacity-85 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300 flex-shrink-0 cursor-pointer"
            onClick={handleAddStory}
          >
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          {stories.map((story, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-full border-2 border-gray-800 cursor-pointer flex-shrink-0 overflow-hidden"
              onClick={() => handleStoryClick(index)}
            >
              <img src={story.avatar} alt={story.name} title={story.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
