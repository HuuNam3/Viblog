"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Search, FileSearch, Sparkles } from "lucide-react"
import RenderPosts from "../RenderPosts"
import { useSearchParams } from "next/navigation"
import  { useEffect, useState } from "react"
import { getPosts,Post } from "@/lib/getPosts"

export default function SearchPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const keyword = searchParams?.get("q") || ""
  useEffect(() => {
    const load = async () => {
      const data = await getPosts(keyword)
      setPosts(data)
      setLoading(false)
      console.log(data)
    }

    load()
  }, [keyword])

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
          Find exactly what you&apos;re looking for in our collection of articles.
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
      {!loading && (
        <>
          {keyword && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-purple-600" />
                {posts.length === 0
                  ? "No results found"
                  : `Found ${posts.length} result${posts.length === 1 ? "" : "s"} for "${keyword}"`}
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
        </>
      )}
      {keyword && (<RenderPosts query={keyword}/>)}
    </div>
  )
}
