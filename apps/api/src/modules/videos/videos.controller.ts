import type { Request, Response } from 'express';
import * as VideoService from './videos.service.js';

export const getAllVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await VideoService.getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron recuperar los videos" });
  }
};

export const scanVideos = async (_req: Request, res: Response) => {
  try {
    const newVideos = await VideoService.scanNewVideos();
    res.status(200).json({
      message: "Escaneo completado",
      addedCount: newVideos.length,
      videos: newVideos
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error durante el escaneo" });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const video = await VideoService.getVideoById(id as string);
    
    if (!video) {
      return res.status(404).json({ error: "Video no encontrado" });
    }
    
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el video" });
  }
};

export const streamVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Streaming de video ${id}` });
};

export const updateVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  res.json({ message: `Video ${id} actualizado`, data });
};
