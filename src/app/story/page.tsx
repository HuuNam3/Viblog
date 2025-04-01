"use client"
import { NextPage } from 'next';
import StoriesInterface from '~/components/story/stories-interface';
import StoryViewer from '~/components/story/story-viewer';


const Story: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <StoriesInterface />
      <div className="flex items-center flex-col">
        <h1 className="text-2xl font-bold mb-8 text-amber-700">Story Viewer</h1>
        <div className="max-w-md w-full">
          <StoryViewer/>
        </div>
      </div>
    </main>
  );
};

export default Story;