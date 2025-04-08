import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LikeButton from "../like-button"
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
  const filePath = path.join(process.cwd(), "src/app/data/posts.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Function to get a single post from the JSON file
async function getPost(id: number): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find((post) => post.id === id)
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = Number.parseInt(params.id)

  // Find the post with the matching ID
  const post = await getPost(postId)

  // If no post is found, return a 404 page
  if (!post) {
    notFound()
  }

  // Format the content with paragraphs
  const formattedContent = post.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ))

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/posts" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Posts</span>
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
            <LikeButton postId={post.id} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Featured Image */}
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={`Featured image for ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </div>

          <div className="prose max-w-none">{formattedContent}</div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <span className="text-sm text-muted-foreground">Post #{post.id}</span>
        </CardFooter>
      </Card>
    </div>
  )
}

// Enable Incremental Static Regeneration with a revalidation period of 60 seconds
export const revalidate = 60
