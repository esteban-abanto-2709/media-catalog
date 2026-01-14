import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { VideosService } from './videos.service';
import { VideoResponseDto } from './dto/video-response.dto';
import { createReadStream, statSync } from 'fs';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async getAll(): Promise<VideoResponseDto[]> {
    return this.videosService.findAll();
  }

  @Get(':id/stream')
  async streamVideo(@Param('id') id: string, @Res() res: Response) {
    const videoPath = await this.videosService.getVideoPath(id);
    const stat = statSync(videoPath);

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': stat.size,
    });

    const stream = createReadStream(videoPath);
    stream.pipe(res);
  }
}
