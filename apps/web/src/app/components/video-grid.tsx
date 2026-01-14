import VideoCard from "./video-card";

type Video = {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  modifiedAt: string;
};

type VideoGridProps = {
  videos: Video[];
};

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          filename={video.filename}
          size={video.size}
          createdAt={video.createdAt}
        />
      ))}
    </div>
  );
}