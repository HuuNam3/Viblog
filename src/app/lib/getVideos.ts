import fs from 'fs/promises';
import path from 'path';

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  caption: string;
  likes: string;
  userAvatar: string;
}

export async function getVideos(): Promise<Video[]> {
  const filePath = path.join(process.cwd(), 'src/app/data/videos.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}