"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileUp } from "lucide-react"
import { getCurrentUser, requireAuth } from "@/lib/auth"
import { useRouter, useSearchParams } from "next/navigation";

// Define the Post type
interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  authorId: number
  image: string
  content: string
}

export default function NewPostPage() {
  // Require authentication for this page
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams?.get("callbackUrl") || "/posts";

  async function addPost(formData: FormData) {
    
    // Check if user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("You must be logged in to create a post")
    }
  
    // Extract form data
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const image = formData.get("image") as string
    const content = formData.get("content") as string
  
    // Validate form data
    if (!title || !excerpt || !image || !content) {
      throw new Error("All fields are required")
    }
  
    try {
      // Get existing posts
      const posts = await getPosts()
  
      // Generate a new ID (max ID + 1)
      const newId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1
  
      // Format the current date
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  
      // Create the new post
      const newPost: Post = {
        id: newId,
        title,
        excerpt,
        date,
        author: user.name,
        authorId: user.id,
        image,
        content,
      }
  
      // Add the new post to the array
      posts.push(newPost)
  
      // Save the updated posts array
      await savePosts(posts)
  
      // Redirect to the posts list
      router.push(callbackUrl);
    } catch (error) {
      console.error("Error adding post:", error)
      throw new Error("Failed to add post")
    }
  }
  await requireAuth()

  // Get the current user
  const user = await getCurrentUser()

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

      <Card className="max-w-2xl mx-auto border-none shadow-lg overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>All fields are required to publish your post.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form action={addPost} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter post title"
                required
                className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-gray-700">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Enter a short excerpt or summary"
                className="h-20 border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-700">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                placeholder="Enter image URL"
                defaultValue="/placeholder.svg?height=600&width=1200"
                required
                className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-500">
                Enter a URL for the featured image. You can use placeholder.svg for testing.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-700">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                className="h-64 border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                required
              />
              <p className="text-sm text-gray-500">Use double line breaks (\n\n) to create new paragraphs.</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3 text-sm text-purple-700">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
                {user?.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">Publishing as {user?.name}</p>
                <p className="text-xs text-purple-600">Your name will be displayed as the author of this post</p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <FileUp className="h-4 w-4 mr-2" />
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
