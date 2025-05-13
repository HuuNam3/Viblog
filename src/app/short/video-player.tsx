import { ShowMoreText } from '@/components/common/ShowMoreText';
import { useEffect, useRef, useState } from 'react';
import { Video } from '@/types/video';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function handleVideoPlay() {
      if (!videoRef.current || !isActive) return;

      try {
        videoRef.current.load();
        await videoRef.current.play();
      } catch (err) {
        if (mounted) {
          console.error("Error playing video:", err);
          setError("Failed to play video");
        }
      }
    }

    if (isActive) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isActive]);

  return (
    <div className="relative w-full h-screen bg-black">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>{error}</p>
        </div>
      ) : video.videoUrl ? (
        <video
          ref={videoRef}
          key={video.id}
          className="w-full h-full object-contain"
          controls
          preload={isActive ? "auto" : "none"}
          playsInline
          onError={() => setError("Failed to load video")}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>No video available</p>
        </div>
      )}

      <div className="absolute bottom-16 left-4 right-4 text-white z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-lg font-bold">
            {video.username.charAt(0)}
          </div>
          <div>
            <p className="font-bold">{video.username}</p>
            <ShowMoreText text={video.caption} maxLength={40} className="max-w-[350px]" />
          </div>
        </div>
      </div>
    </div>
  );
}