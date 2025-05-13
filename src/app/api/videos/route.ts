import { ApiHandler } from '@/lib/api-handler';
import { Video } from '@/types/video';
import { NextResponse } from 'next/server';

const VIDEOS_FILE_PATH = "src/app/data/videos.json";

export async function GET() {
  try {
    const response = await ApiHandler.handleGet<Video>(VIDEOS_FILE_PATH);
    const responseData = await response.json();
    return NextResponse.json(responseData.data || []);
  } catch (error) {
    console.error('Error in GET /api/videos:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  return ApiHandler.handlePost<Video>(VIDEOS_FILE_PATH, data, {
    validate: (data) => {
      if (!data.videoUrl) return "Video URL is required";
      if (!data.title) return "Title is required";
      return true;
    }
  });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '');
  const data = await request.json();

  return ApiHandler.handlePut<Video>(VIDEOS_FILE_PATH, id, data, {
    validate: (data) => {
      if (data.videoUrl === "") return "Video URL cannot be empty";
      if (data.title === "") return "Title cannot be empty";
      return true;
    }
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '');

  return ApiHandler.handleDelete<Video>(VIDEOS_FILE_PATH, id);
}