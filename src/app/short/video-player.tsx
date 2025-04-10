import Image from 'next/image';

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  caption: string;
  likes: string;
  userAvatar: string;
}

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="relative w-full h-11/12 mt-2">
      {video.videoUrl ? (
        <video
          width={720}
          height={405}
          controls
          className="object-cover w-full h-full"
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available</p>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <div className="flex items-center space-x-2">
          <Image
            src={video.userAvatar}
            alt={video.username}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-bold">{video.username}</p>
            <p>{video.caption}</p>
            <p>Likes: {video.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}