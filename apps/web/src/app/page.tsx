import { getVideos } from "@/lib/videos";

export default function HomePage() {
  const videos = getVideos();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Video Library
      </h1>

      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.path}
            className="border rounded p-3"
          >
            <div className="font-medium">{video.name}</div>
            <div className="text-sm text-gray-500">
              {video.createdAt.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
