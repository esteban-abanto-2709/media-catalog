import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getVideoPath(id: string): Promise<string> {
    const video = await this.prisma.video.findUnique({
      where: { id },
      select: { path: true },
    });

    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }

    return video.path;
  }

  async existsByFilename(filename: string): Promise<boolean> {
    const count = await this.prisma.video.count({
      where: { filename },
    });
    return count > 0;
  }

  async createMinimal(data: {
    title: string;
    filename: string;
    path: string;
    size: number;
  }) {
    return this.prisma.video.create({
      data,
    });
  }

  // ========== MÉTODOS DE EDICIÓN ==========

  async updateVideo(id: string, data: UpdateVideoDto) {
    return this.prisma.video.update({
      where: { id },
      data,
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  // ========== TAG OPERATIONS ==========

  async findOrCreateTag(name: string) {
    return this.prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async addTagToVideo(videoId: string, tagId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  async removeTagFromVideo(videoId: string, tagId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  // ========== PRODUCER OPERATIONS ==========

  async findOrCreateProducer(name: string) {
    return this.prisma.producer.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async addProducerToVideo(videoId: string, producerId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        producers: {
          connect: { id: producerId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  async removeProducerFromVideo(videoId: string, producerId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        producers: {
          disconnect: { id: producerId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  // ========== ACTOR OPERATIONS ==========

  async findOrCreateActor(name: string) {
    return this.prisma.actor.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async addActorToVideo(videoId: string, actorId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        actors: {
          connect: { id: actorId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }

  async removeActorFromVideo(videoId: string, actorId: string) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        actors: {
          disconnect: { id: actorId },
        },
      },
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
    });
  }
}