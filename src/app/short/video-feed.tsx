"use client"

import { useState, useEffect } from "react";
import VideoPlayer from "./video-player";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/components/common/Loading";
import { Video } from "@/types/video";

export default function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function fetchVideos() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch('/api/videos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        
        if (mounted) {
          if (!Array.isArray(data) || data.length === 0) {
            setError("No videos available");
            return;
          }
          setVideos(data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        if (mounted) {
          setError("Failed to load videos");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      mounted = false;
    };
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

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        handleNextVideo();
      } else if (event.key === "ArrowLeft") {
        handlePreviousVideo();
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentVideoIndex, videos.length]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <p>{error || "No videos available"}</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-black">
      {/* Previous button - left side */}
      {currentVideoIndex > 0 && (
        <button
          onClick={handlePreviousVideo}
          className="absolute top-1/2 left-4 z-20 bg-black/30 p-2 rounded-full backdrop-blur-sm transform -translate-y-1/2 hover:bg-black/50 transition-colors"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Next button - right side */}
      {currentVideoIndex < videos.length - 1 && (
        <button
          onClick={handleNextVideo}
          className="absolute top-1/2 right-4 z-20 bg-black/30 p-2 rounded-full backdrop-blur-sm transform -translate-y-1/2 hover:bg-black/50 transition-colors"
          aria-label="Next video"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      )}

      <div className="h-full">
        <VideoPlayer 
          key={videos[currentVideoIndex].id} 
          video={videos[currentVideoIndex]} 
          isActive={true}
        />
      </div>

      {/* Video progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-4 rounded-full transition-colors ${
              index === currentVideoIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}