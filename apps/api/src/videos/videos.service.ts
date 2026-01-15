import { Injectable } from '@nestjs/common';
import { VideosRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async findAll() {
    return this.videosRepository.getAllVideos();
  }

  async findOne(id: string) {
    return this.videosRepository.getVideoById(id);
  }

  async getVideoPath(id: string): Promise<string> {
    return this.videosRepository.getVideoPath(id);
  }
}