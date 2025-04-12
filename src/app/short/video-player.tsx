import { ShowMoreText } from '@/components/common/ShowMoreText';

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  caption: string;
}

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="relative w-full h-11/12 mt-2">
      {video.videoUrl ? (
        <video
          key={video.id}
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

      <div className="absolute bottom-16 left-4 right-4 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 max-h-8 max-w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-lg font-bold">
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