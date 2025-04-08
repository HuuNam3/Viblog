import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// Define the Post type
interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  content: string
}

// Function to get all posts from the JSON file
async function getPosts(): Promise<Post[]> {
  try {
    const filePath = path.join(process.cwd(), "app/data/posts.json")
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

// GET handler to return all posts
export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error in GET /api/posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
