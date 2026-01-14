import { getVideos } from "@/lib/videos";
import VideoPlayer from "@/app/video-player";

export default function HomePage() {
  const videos = getVideos();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Video Library</h1>
      <VideoPlayer videos={videos} />
    </main>
  );
}
