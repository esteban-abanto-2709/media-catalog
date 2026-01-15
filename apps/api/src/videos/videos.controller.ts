import {
  Controller, Get, Param, Res,
  Post, Patch, Delete, Body,
} from '@nestjs/common';
import type { Response } from 'express';
import { VideosService } from './videos.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateProducerDto } from './dto/create-producer.dto';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Get('/')
  getAllVideos() {
    return this.videosService.getAllVideos();
  }

  @Get('/scan')
  scanNewVideos() {
    return this.videosService.scanNewVideos();
  }

  @Get('/:id')
  getVideoById(@Param('id') id: string) {
    return this.videosService.getVideoById(id);
  }

  @Patch('/:id')
  patchVideoById(
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.videosService.patchVideoId(id, body);
  }

  @Get(':id/stream')
  async getVideoStream(@Param('id') id: string, @Res() res: Response) {
    this.videosService.getVideoStream(id, res);
  }

  // ========== TAG ENDPOINTS ==========

  @Post(':id/tags')
  addTag(@Param('id') id: string, @Body() data: CreateTagDto) {
    return this.videosService.addTag(id, data);
  }

  @Delete(':id/tags/:tagId')
  removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return this.videosService.removeTag(id, tagId);
  }

  // ========== PRODUCER ENDPOINTS ==========

  @Post(':id/producers')
  addProducer(@Param('id') id: string, @Body() data: CreateProducerDto) {
    return this.videosService.addProducer(id, data);
  }

  @Delete(':id/producers/:producerId')
  removeProducer(@Param('id') id: string, @Param('producerId') producerId: string) {
    return this.videosService.removeProducer(id, producerId);
  }

  // ========== ACTOR ENDPOINTS ==========

  @Post(':id/actors')
  addActor(@Param('id') id: string, @Body() data: CreateActorDto) {
    return this.videosService.addActor(id, data);
  }

  @Delete(':id/actors/:actorId')
  removeActor(@Param('id') id: string, @Param('actorId') actorId: string) {
    return this.videosService.removeActor(id, actorId);
  }
}