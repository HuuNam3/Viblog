import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, FileSearch, Sparkles } from "lucide-react"
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
  const filePath = path.join(process.cwd(), "src/app/data/posts.json")
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

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.q || ""
  const results = keyword ? await searchPosts(keyword) : []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild className="hover:bg-purple-50 hover:text-purple-700">
          <Link href="/posts" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </Link>
        </Button>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Discover Content</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Search Our Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find exactly what you're looking for in our collection of articles.
        </p>

        <div className="max-w-2xl mx-auto">
          <form className="flex gap-2 bg-white p-2 rounded-full shadow-md">
            <Input
              name="q"
              placeholder="Search for posts..."
              defaultValue={keyword}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-full bg-purple-600 hover:bg-purple-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>

      {keyword && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-purple-600" />
            {results.length === 0
              ? "No results found"
              : `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${keyword}"`}
          </h2>
          <Separator className="bg-purple-200" />
        </div>
      )}

      {!keyword && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Search for something</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter a keyword above to search through our collection of articles.
          </p>
        </div>
      )}

      <div className="grid gap-8">
        {results.map((post) => {
          const category = getRandomCategory(post.id)

          return (
            <Card
              key={post.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${category.color}`}>
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-purple-700 transition-colors">
                      <Link href={`/posts/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span>By {post.author}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                  <div>
                    <p className="text-lg font-medium mb-4 text-gray-800">{post.excerpt}</p>
                    <Separator className="my-4" />
                    <p className="text-gray-600">{post.content.split("\n")[0]}</p>
                  </div>
                  <div className="relative h-[200px] rounded-lg overflow-hidden shadow-md transform group-hover:scale-[1.02] transition-transform duration-300">
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
              <CardFooter className="flex justify-between bg-gray-50">
                <span className="text-sm text-gray-500">Post #{post.id}</span>
                <Link
                  href={`/posts/${post.id}`}
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1"
                >
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-3 w-3"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
