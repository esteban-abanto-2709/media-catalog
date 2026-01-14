import fs from "fs";
import path from "path";

export type VideoFile = {
  name: string;
  path: string;
  createdAt: Date;
};

const VIDEO_EXTENSIONS = [".mp4", ".mkv", ".avi", ".mov"];

export function getVideos(): VideoFile[] {
  const basePath = process.env.VIDEO_LIBRARY_PATH;

  if (!basePath) {
    throw new Error("VIDEO_LIBRARY_PATH is not defined");
  }

  const files = fs.readdirSync(basePath);

  const videos = files
    .filter((file) =>
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    )
    .map((file) => {
      const fullPath = path.join(basePath, file);
      const stats = fs.statSync(fullPath);

      return {
        name: file,
        path: fullPath,
        createdAt: stats.birthtime,
      };
    })
    .sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

  return videos;
}
