import { Injectable } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import { VideoResponseDto } from './dto/video-response.dto';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async findAll(): Promise<VideoResponseDto[]> {
    const videos = await this.videosRepository.getAllVideos();

    // Ordenar por fecha de creación (más recientes primero)
    return videos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getVideoPath(id: string): Promise<string> {
    return this.videosRepository.getVideoPath(id);
  }
}
