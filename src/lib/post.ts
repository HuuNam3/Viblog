'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import { Post } from "@/types/post";

const POSTS_FILE = path.join(process.cwd(), "public/data/posts.json");

// Đọc tất cả bài viết
export async function getPosts(): Promise<Post[]> {
  try {
    const fileContents = await fs.readFile(POSTS_FILE, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

// Lấy một bài viết theo ID
export async function getPost(id: string | number): Promise<Post | null> {
  try {
    const posts = await getPosts();
    const post = posts.find((p) => p.id === Number(id));
    return post || null;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

// Tạo bài viết mới
export async function createPost(data: Omit<Post, "id">): Promise<Post | null> {
  try {
    const posts = await getPosts();
    const newPost = {
      id: posts.length + 1,
      ...data,
    };

    posts.push(newPost);
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
    revalidatePath("/posts");
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

// Cập nhật bài viết
export async function updatePost(id: number, data: Partial<Post>): Promise<Post | null> {
  try {
    const posts = await getPosts();
    const index = posts.findIndex((p) => p.id === id);
    
    if (index === -1) return null;

    const updatedPost = {
      ...posts[index],
      ...data,
      id: posts[index].id, // Đảm bảo ID không bị thay đổi
    };

    posts[index] = updatedPost;
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    return null;
  }
}

// Xóa bài viết
export async function deletePost(id: number): Promise<boolean> {
  try {
    const posts = await getPosts();
    const filteredPosts = posts.filter((p) => p.id !== id);
    
    if (filteredPosts.length === posts.length) {
      return false; // Không tìm thấy bài viết để xóa
    }

    await fs.writeFile(POSTS_FILE, JSON.stringify(filteredPosts, null, 2));
    revalidatePath("/posts");
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}

// Tìm kiếm bài viết
export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const posts = await getPosts();
    const searchTerm = query.toLowerCase();
    
    return posts.filter((post) => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.excerpt?.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}

// Cập nhật lượt thích
export async function updateLikes(id: number, increment: boolean = true): Promise<number | null> {
  try {
    const posts = await getPosts();
    const index = posts.findIndex((p) => p.id === id);
    
    if (index === -1) return null;

    const currentLikes = posts[index].like || 0;
    posts[index].like = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1);
    
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
    revalidatePath(`/posts/${id}`);
    return posts[index].like;
  } catch (error) {
    console.error("Error updating likes:", error);
    return null;
  }
}

// Lấy các bài viết phân trang
export async function getPaginatedPosts(page: number = 1, limit: number = 10): Promise<{
  posts: Post[];
  total: number;
  totalPages: number;
}> {
  try {
    const posts = await getPosts();
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      posts: posts.slice(start, end),
      total: posts.length,
      totalPages: Math.ceil(posts.length / limit),
    };
  } catch (error) {
    console.error("Error getting paginated posts:", error);
    return {
      posts: [],
      total: 0,
      totalPages: 0,
    };
  }
}
