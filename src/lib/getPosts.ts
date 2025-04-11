"use client"

export interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  content: string
  like: number
}

export async function getPosts(query = ""): Promise<Post[]> {
  try {
    const url = query ? `/api/posts/search?q=${encodeURIComponent(query)}` : "/api/posts"
    const res = await fetch(url)
    console.log(url)
    console.log(res)
    if (!res.ok) throw new Error("Failed to fetch posts")

    return await res.json()
  } catch (error) {
    console.error("fetchPosts error:", error)
    return []
  }
}
