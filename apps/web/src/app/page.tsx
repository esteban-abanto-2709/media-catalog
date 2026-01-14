import { getVideos } from "@/lib/videos";
import VideoGrid from "@/app/components/video-grid";

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Video Library</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {videos.length} videos available
        </p>
      </header>

      <VideoGrid videos={videos} />
    </main>
  );
}