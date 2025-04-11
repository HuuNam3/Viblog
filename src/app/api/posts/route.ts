"use server"
import { NextResponse } from "next/server"
import fs from "fs/promises"
import fs1 from "fs"
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
    console.error("Error in GET /api/posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Đường dẫn tuyệt đối đến file JSON
    const filePath = path.join(process.cwd(), "src/app/data/posts.json")

    // Đọc dữ liệu cũ
    const fileData = fs1.readFileSync(filePath, "utf-8")
    const contacts = JSON.parse(fileData)

    // Tạo id mới
    const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1
    const newContact = { id: newId, ...data }

    // Thêm vào danh sách
    contacts.push(newContact)

    // Ghi lại vào file JSON
    fs1.writeFileSync(filePath, JSON.stringify(contacts, null, 2))

    return NextResponse.json({ message: "Success", contact: newContact }, { status: 200 })
  } catch (error) {
    console.error("Error saving contact:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}