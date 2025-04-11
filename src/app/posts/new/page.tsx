"use client"
import { Sparkles } from "lucide-react"
import CreatePostForm from "./CreatePostForm"

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Create Content</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Share Your Ideas</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Fill out the form below to create a new blog post and share your knowledge with our readers.
        </p>
      </div>

      <CreatePostForm/>
    </div>
  )
}
