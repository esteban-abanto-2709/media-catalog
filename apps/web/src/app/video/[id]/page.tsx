import { notFound } from "next/navigation";
import VideoPlayer from "@/app/components/video-player";

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Producer = {
  id: string;
  name: string;
  slug: string;
};

export type Actor = {
  id: string;
  name: string;
  slug: string;
};

export type VideoFile = {
  id: string;
  title: string;
  description: string | null;
  filename: string;
  path: string;
  size: number;
  duration: number | null;
  width: number | null;
  height: number | null;
  providerUrl: string | null;
  createdAt: string | null;
  uploadedAt: string;
  updatedAt: string;
  tags: Tag[];
  producers: Producer[];
  actors: Actor[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getVideo(id: string): Promise<VideoFile | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  try {
    const response = await fetch(`${apiUrl}/videos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const videos = await response.json();
    return videos.find((v: VideoFile) => v.id === id) || null;
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

  return <VideoPlayer video={video} />;
}