import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class VideosRepository {
  private readonly videoPath: string;

  constructor(private configService: ConfigService) {
    const path = this.configService.get<string>('VIDEO_LIBRARY_PATH');
    if (!path) {
      throw new Error('VIDEO_LIBRARY_PATH environment variable is required');
    }
    this.videoPath = path;
  }

  async getAllVideos() {
    try {
      const files = await fs.readdir(this.videoPath);

      // Filtrar solo archivos de video
      const videoExtensions = [
        '.mp4',
        '.mkv',
        '.avi',
        '.mov',
        '.wmv',
        '.flv',
        '.webm',
      ];
      const videoFiles = files.filter((file) =>
        videoExtensions.some((ext) => file.toLowerCase().endsWith(ext)),
      );

      const videos = await Promise.all(
        videoFiles.map(async (filename) => {
          const fullPath = path.join(this.videoPath, filename);
          const stats = await fs.stat(fullPath);

          return {
            id: filename,
            filename,
            path: fullPath,
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
          };
        }),
      );

      return videos;
    } catch (error) {
      throw new Error(`Error reading videos directory: ${error.message}`);
    }
  }

  async getVideoPath(id: string): Promise<string> {
    const fullPath = path.join(this.videoPath, id);

    try {
      await fs.access(fullPath);
      return fullPath;
    } catch {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
  }
}
