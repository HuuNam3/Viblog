import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import fs from "fs/promises"
import path from "path"

// Define the Post type
interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  content: string
}

// Function to get all posts from the JSON file
async function getPosts(): Promise<Post[]> {
  try {
    const filePath = path.join(process.cwd(), "src/app/data/posts.json")
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

// Function to save posts to the JSON file
async function savePosts(posts: Post[]): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), "src/app/data/posts.json")
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving posts:", error)
    throw new Error("Failed to save post")
  }
}

// Server Action to add a new post
async function addPost(formData: FormData) {
  "use server"

  // Extract form data
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const author = formData.get("author") as string
  const image = formData.get("image") as string
  const content = formData.get("content") as string

  // Validate form data
  if (!title || !excerpt || !author || !image || !content) {
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
      author,
      image,
      content,
    }

    // Add the new post to the array
    posts.push(newPost)

    // Save the updated posts array
    await savePosts(posts)

    // Redirect to the posts list
    redirect("/posts")
  } catch (error) {
    console.error("Error adding post:", error)
    throw new Error("Failed to add post")
  }
}

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/posts" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Posts</span>
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Fill out the form below to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={addPost} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter post title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Enter a short excerpt or summary"
                className="h-20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" placeholder="Enter author name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                placeholder="Enter image URL"
                defaultValue="/placeholder.svg?height=600&width=1200"
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter a URL for the featured image. You can use placeholder.svg for testing.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                className="h-64"
                required
              />
              <p className="text-sm text-muted-foreground">Use double line breaks (\n\n) to create new paragraphs.</p>
            </div>

            <Button type="submit" className="w-full">
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
