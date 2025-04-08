import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
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

// Function to get posts from the JSON file
async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "app/data/posts.json")
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

// Function to search posts by keyword
async function searchPosts(keyword: string): Promise<Post[]> {
  if (!keyword) return []

  const posts = await getPosts()
  const lowercaseKeyword = keyword.toLowerCase()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseKeyword) ||
      post.content.toLowerCase().includes(lowercaseKeyword) ||
      post.excerpt.toLowerCase().includes(lowercaseKeyword),
  )
}

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.q || ""
  const results = keyword ? await searchPosts(keyword) : []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/posts" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Search Posts</h1>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <form className="flex gap-2">
          <Input name="q" placeholder="Search for posts..." defaultValue={keyword} className="flex-1" />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {keyword && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {results.length === 0
              ? "No results found"
              : `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${keyword}"`}
          </h2>
          <Separator />
        </div>
      )}

      <div className="grid gap-8">
        {results.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-2xl">
                <Link href={`/posts/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2">
                Published on {post.date} by {post.author}
              </CardDescription>
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
              <Link href={`/posts/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
