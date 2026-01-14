"use client";

import { useState } from "react";

type Video = {
  name: string;
};

export default function VideoPlayer({ videos, }: { videos: Video[]; }) {
  const [current, setCurrent] = useState<string | null>(null);

  return (
    <>
      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.name}
            className="cursor-pointer underline"
            onClick={() => setCurrent(video.name)}
          >
            {video.name}
          </li>
        ))}
      </ul>

      {current && (
        <div className="mt-6">
          <video
            src={`/api/video?name=${encodeURIComponent(current)}`}
            controls
            className="w-full max-w-4xl"
          />
        </div>
      )}
    </>
  );
}
