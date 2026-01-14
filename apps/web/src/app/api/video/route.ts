import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return new Response("Missing video name", { status: 400 });
  }

  const basePath = process.env.VIDEO_LIBRARY_PATH;
  if (!basePath) {
    return new Response("VIDEO_LIBRARY_PATH not configured", {
      status: 500,
    });
  }

  const videoPath = path.join(basePath, name);

  if (!fs.existsSync(videoPath)) {
    return new Response("Video not found", { status: 404 });
  }

  const stat = fs.statSync(videoPath);
  const file = fs.readFileSync(videoPath);

  return new Response(file, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": stat.size.toString(),
    },
  });
}
