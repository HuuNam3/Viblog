"use server"

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import {Post} from "@/lib/getPosts"

async function readPosts(): Promise<Post[]> {
  try {
    const filePath = path.join(process.cwd(), "src/app/data/posts.json")
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")?.toLowerCase().trim()

    const posts = await readPosts()

    if (!q) {
      return NextResponse.json(posts)
    }

    const filtered = posts.filter(post =>
      `${post.title} ${post.excerpt} ${post.content} ${post.author}`.toLowerCase().includes(q)
    )

    return NextResponse.json(filtered)
  } catch (error) {
    console.error("Error in GET /api/posts/search:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
