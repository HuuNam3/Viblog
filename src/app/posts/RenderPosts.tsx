"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import LikeButton from "./like-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Post, getPosts } from "@/lib/getPosts"
import Loading from '@/components/common/Loading'

interface Props {
  query?: string
}

function getRandomCategory(postId: number) {
  const categories = [
    { name: "Web Development", color: "bg-pink-100 text-pink-800 border-pink-200" },
    { name: "Programming", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Design", color: "bg-amber-100 text-amber-800 border-amber-200" },
    { name: "Technology", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "Tutorial", color: "bg-purple-100 text-purple-800 border-purple-200" },
  ]

  return categories[postId % categories.length]
}


export default function RenderPosts( {query}: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      const data = await getPosts(query);
      setPosts(data);
      setLoading(false)
      console.log(data)
    }

    load()
  }, [query])

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => {
            const category = getRandomCategory(post.id)
            return (
              <Card
                key={post.id}
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
  
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
  
                    <LikeButton numbers={post.like} />
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
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )  
}
