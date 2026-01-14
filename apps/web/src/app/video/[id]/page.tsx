import { notFound } from "next/navigation";
import Link from "next/link";
import { VideoFile } from "@/lib/videos";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getVideo(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/videos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const videos = await response.json();
    return videos.find((v: VideoFile) => v.id === id);
  } catch {
    return null;
  }
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params;
  const video = await getVideo(decodeURIComponent(id));

  if (!video) {
    notFound();
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const videoUrl = `${apiUrl}/videos/${encodeURIComponent(video.id)}/stream`;

  const formatSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header con botón de volver */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Library
          </Link>
        </div>
      </header>

      {/* Player centrado */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-6xl space-y-6">
          {/* Video player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Info del video */}
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <h1 className="text-2xl font-bold">{video.filename}</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Size</p>
                <p className="font-semibold">{formatSize(video.size)} MB</p>
              </div>

              <div>
                <p className="text-gray-400">Created</p>
                <p className="font-semibold">{formatDate(video.createdAt)}</p>
              </div>

              <div>
                <p className="text-gray-400">Modified</p>
                <p className="font-semibold">{formatDate(video.modifiedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}