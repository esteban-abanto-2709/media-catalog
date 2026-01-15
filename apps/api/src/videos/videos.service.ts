import { Injectable, NotFoundException } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateProducerDto } from './dto/create-producer.dto';
import { CreateActorDto } from './dto/create-actor.dto';
import * as fs from 'fs';
import { createReadStream, statSync } from 'fs';

import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository, private readonly prisma: PrismaService) { }

  getAllVideos() {
    return this.prisma.video.findMany({
      select: {
        id: true,
        title: true,
        size: true,
        uploadedAt: true
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async scanNewVideos() {
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

      const exists = await this.videosRepository.existsByFilename(filename);
      if (exists) continue;

      const stats = fs.statSync(fullPath);

      const title = path
        .parse(filename)
        .name.replace(/[._-]+/g, ' ')
        .trim();

      const video = await this.videosRepository.createMinimal({
        title,
        filename,
        path: fullPath,
        size: stats.size,
      });

      inserted.push(video);
    }

    return inserted;
  }

  async getVideoById(id: string) {
    const video = await this.prisma.video.findUnique({
      where: { id },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });

    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }

    return video;
  }

  patchVideoId(id: string, data: UpdateVideoDto) {
    return this.prisma.video.update({
      where: { id },
      data,
      include: {
        tags: true,
        producers: true,
        actors: true,
      }
    });
  }


  async getVideoStream(id: string, res: Response) {
    const videoPath = await this.getVideoPath(id);
    const stat = statSync(videoPath);

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': stat.size,
    });

    const stream = createReadStream(videoPath);
    stream.pipe(res);
  }

  async getVideoPath(id: string): Promise<string> {
    return this.videosRepository.getVideoPath(id);
  }



  // ========== TAG OPERATIONS ==========

  async addTag(videoId: string, data: CreateTagDto) {
    const tag = await this.videosRepository.findOrCreateTag(data.name);
    return this.videosRepository.addTagToVideo(videoId, tag.id);
  }

  removeTag(videoId: string, tagId: string) {
    return this.videosRepository.removeTagFromVideo(videoId, tagId);
  }

  // ========== PRODUCER OPERATIONS ==========

  async addProducer(videoId: string, data: CreateProducerDto) {
    const producer = await this.videosRepository.findOrCreateProducer(data.name);
    return this.videosRepository.addProducerToVideo(videoId, producer.id);
  }

  removeProducer(videoId: string, producerId: string) {
    return this.videosRepository.removeProducerFromVideo(videoId, producerId);
  }

  // // ========== ACTOR OPERATIONS ==========

  async addActor(videoId: string, data: CreateActorDto) {
    const actor = await this.videosRepository.findOrCreateActor(data.name);
    return this.videosRepository.addActorToVideo(videoId, actor.id);
  }

  removeActor(videoId: string, actorId: string) {
    return this.videosRepository.removeActorFromVideo(videoId, actorId);
  }
}