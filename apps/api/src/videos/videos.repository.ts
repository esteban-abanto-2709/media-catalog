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
        updatedAt: 'desc',
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
}
