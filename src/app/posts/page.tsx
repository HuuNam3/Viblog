import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, PlusCircle, Search } from "lucide-react"
import Image from "next/image"
import LikeButton from "./like-button"
import fs from "fs/promises"
import path from "path"
import Link from "next/link"

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

// Function to get posts from the JSON file
async function getPosts(): Promise<Post[]> {
  // Add a small delay to simulate network latency (for demo purposes)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const filePath = path.join(process.cwd(), "src/app/data/posts.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

interface PostsPageProps {
  searchParams: {
    loginRequired?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // Fetch posts from the JSON file
  const posts = await getPosts()
  const showLoginAlert = searchParams.loginRequired === "true"

  return (
    <div className="container mx-auto px-4 py-12">
      {showLoginAlert && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to create a new post. Please log in using the button in the header.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/posts/search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search Posts</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/posts/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Post</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    <a href={`/posts/${post.id}`} className="hover:underline">
                      {post.title}
                    </a>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Published on {post.date} by {post.author}
                  </CardDescription>
                </div>
                <LikeButton postId={post.id} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                <div>
                  <p className="text-lg font-medium mb-4">{post.excerpt}</p>
                  <Separator className="my-4" />
                  <p>{post.content.split("\n")[0]}</p>
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={`Featured image for ${post.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">Post #{post.id}</span>
              <a href={`/posts/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                Read more
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
