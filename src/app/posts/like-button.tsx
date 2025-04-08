"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface LikeButtonProps {
  postId: number
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      className="flex items-center gap-2"
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
      <span>
        {likes} {likes === 1 ? "Like" : "Likes"}
      </span>
    </Button>
  )
}
