"use server"
import { NextResponse } from "next/server"
import { ApiHandler } from "@/lib/api-handler"
import { Post } from "@/types/post"

const POSTS_PER_PAGE = 5
const POSTS_FILE_PATH = "src/app/data/posts.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')

  const response = await ApiHandler.handleGet<Post>(POSTS_FILE_PATH, {
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

export async function POST(request: Request) {
  const data = await request.json()
  
  return ApiHandler.handlePost<Post>(POSTS_FILE_PATH, data, {
    validate: (data) => {
      if (!data.title) return "Title is required"
      if (!data.content) return "Content is required"
      return true
    },
    transform: (post) => ({
      ...post,
      date: new Date().toLocaleDateString()
    })
  })
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '')
  const data = await request.json()

  return ApiHandler.handlePut<Post>(POSTS_FILE_PATH, id, data, {
    validate: (data) => {
      if (data.title === "") return "Title cannot be empty"
      if (data.content === "") return "Content cannot be empty"
      return true
    }
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '')

  return ApiHandler.handleDelete<Post>(POSTS_FILE_PATH, id)
}