"use client"

import { useState, useEffect } from "react";
import VideoPlayer from "./video-player";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/components/common/Loading";

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  caption: string;
}

export default function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        console.log(data)
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  if (videos.length === 0) {
    return (
      <div className="h-screen w-full flex">
        <div className="max-h-[20vh] m-auto">
          <Loading/>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden">
      <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-between px-2 -translate-y-1/2">
        {currentVideoIndex > 0 && (
          <button
            onClick={handlePreviousVideo}
            className="bg-black/30 p-2 rounded-full backdrop-blur-sm"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {currentVideoIndex < videos.length - 1 && (
          <button
            onClick={handleNextVideo}
            className="bg-black/30 p-2 rounded-full backdrop-blur-sm"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex h-full w-auto items-start">
        <VideoPlayer video={videos[currentVideoIndex]} />
      </div>
    </div>
  );
}