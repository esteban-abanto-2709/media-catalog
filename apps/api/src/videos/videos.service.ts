import { Injectable } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) { }

  async findAll() {
    return this.videosRepository.getAllVideos();
  }

  async getVideoPath(id: string): Promise<string> {
    return this.videosRepository.getVideoPath(id);
  }

  async scanLibrary() {
    const basePath = process.env.VIDEO_LIBRARY_PATH;

    if (!basePath) {
      throw new Error('VIDEO_LIBRARY_PATH is not defined');
    }

    const entries = fs.readdirSync(basePath, { withFileTypes: true });

    const videoFiles = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(mp4|mkv|avi|mov|webm)$/i.test(entry.name),
      )
      .map((entry) => entry.name);

    const inserted = [];

    for (const filename of videoFiles) {
      const fullPath = path.resolve(basePath, filename);

      const exists = await this.videosRepository.existsByFilename(filename);
      if (exists) continue;

      const stats = fs.statSync(fullPath);

      // 👇 Corrección real del problema
      const title = path
        .parse(filename)
        .name
        .replace(/[._-]+/g, ' ')
        .trim();

      const video = await this.videosRepository.createMinimal({
        title,
        filename,
        path: fullPath,
        size: stats.size,
      });

      inserted.push(video);
    }

    return {
      scanned: videoFiles.length,
      inserted: inserted.length,
    };
  }
}
