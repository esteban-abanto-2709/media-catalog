import { prisma } from '@/config/prisma.js';

import * as fs from 'fs';
import * as path from 'path';

export const getAllVideos = async () => {
  return await prisma.video.findMany({
    select: { id: true, title: true }
  });
};

export const getVideoById = async (id: string) => {
  return await prisma.video.findUnique({ where: { id } });
};

export const scanNewVideos = async () => {
  const basePath = process.env.VIDEO_LIBRARY_PATH;

  if (!basePath) {
    throw new Error('VIDEO_LIBRARY_PATH is not defined');
  }

  const entries = fs.readdirSync(basePath, { withFileTypes: true });

  const videoFiles = entries
    .filter(
      (entry) =>
        entry.isFile() && /\.(mp4|mkv|avi|mov|webm)$/i.test(entry.name),
    )
    .map((entry) => entry.name);

  const inserted = [];

  for (const filename of videoFiles) {
    const fullPath = path.resolve(basePath, filename);

    const exists = await existsByFilename(filename);
    if (exists) continue;

    const stats = fs.statSync(fullPath);
    console.log(stats);
    
    const title = path.parse(filename).name.replace(/[._-]+/g, ' ').trim();

    const video = await createMinimal({
      title,
      filename,
      path: fullPath,
      size: stats.size,
    });

    inserted.push(video);
  }

  return inserted;
};


const createMinimal = async (data: {
  title: string;
  filename: string;
  path: string;
  size: number;
}) => {
  return prisma.video.create({
    data,
  });
}

// Helpers internos
const existsByFilename = async (filename: string) => {
  const count = await prisma.video.count({ where: { filename } });
  return count > 0;
};