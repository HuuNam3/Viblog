import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
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
  like: number
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

// Function to get a random category for each post (for demo purposes)
function getRandomCategory(postId: number) {
  const categories = [
    { name: "Web Development", color: "bg-pink-100 text-pink-800 border-pink-200" },
    { name: "Programming", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Design", color: "bg-amber-100 text-amber-800 border-amber-200" },
    { name: "Technology", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "Tutorial", color: "bg-purple-100 text-purple-800 border-purple-200" },
  ]

  // Use the post ID to deterministically select a category
  return categories[postId % categories.length]
}

// Function to estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
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

  // Get category and reading time
  const category = getRandomCategory(post.id)
  const readingTime = getReadingTime(post.content)

  // Format the content with paragraphs
  const formattedContent = post.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-6 leading-relaxed text-gray-700">
      {paragraph}
    </p>
  ))

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6 hover:bg-purple-50 hover:text-purple-700">
        <Link href="/posts" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Posts</span>
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${category.color}`}>
              {category.name}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[50vh] mb-8 mt-2 rounded-xl">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Featured image for ${post.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-contain rounded-xl shadow-lg"
          />
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardContent className="p-8">
            <div className="prose max-w-none">{formattedContent}</div>
          </CardContent>
          <CardFooter className="flex justify-between border-t py-6 bg-gray-50">
            <span className="text-sm text-gray-500">Post #{post.id}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Like this post?</span>
              <LikeButton numbers={post.like} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Enable Incremental Static Regeneration with a revalidation period of 60 seconds
export const revalidate = 60
