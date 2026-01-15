import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getAllVideos() {
    return this.prisma.video.findMany({
      include: {
        tags: true,
        producers: true,
        actors: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
}
