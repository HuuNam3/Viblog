import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import RenderPosts from "./RenderPosts"

export default async function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Our Collection</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Explore Our Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insights, tutorials, and inspiration from our collection of articles.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button
            asChild
            variant="outline"
            className="bg-white shadow-sm border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <Link href="/posts/search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search Posts</span>
            </Link>
          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/posts/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Post</span>
            </Link>
          </Button>
        </div>
      </div>
      <RenderPosts/>
    </div>
  )
}
