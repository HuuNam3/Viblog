"use server"

import { NextResponse } from "next/server"
import { ApiHandler } from "@/lib/api-handler"
import { Post } from "@/types/post"

const POSTS_PER_PAGE = 5
const POSTS_FILE_PATH = "src/app/data/posts.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.toLowerCase().trim()
  const page = parseInt(searchParams.get('page') || '1')

  if (!q) {
    return NextResponse.json({
      posts: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalPosts: 0,
        postsPerPage: POSTS_PER_PAGE
      }
    })
  }

  const response = await ApiHandler.handleGet<Post>(POSTS_FILE_PATH, {
    filter: (post) => 
      `${post.title} ${post.excerpt} ${post.content} ${post.author}`
        .toLowerCase()
        .includes(q),
    pagination: {
      page,
      limit: POSTS_PER_PAGE
    }
  })

  // Get the response data
  const responseData = await response.json()

  // Restructure the response to match what the component expects
  return NextResponse.json({
    posts: responseData.data.items,
    pagination: {
      currentPage: responseData.data.pagination.currentPage,
      totalPages: responseData.data.pagination.totalPages,
      totalPosts: responseData.data.pagination.totalItems,
      postsPerPage: responseData.data.pagination.itemsPerPage
    }
  })
}
