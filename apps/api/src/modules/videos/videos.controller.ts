import type { Request, Response } from 'express';

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Lista de videos desde el controlador" });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener videos" });
  }
};

export const scanVideos = async (req: Request, res: Response) => {
  res.json({ message: "Escaneando nuevos videos..." });
};

export const getVideoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Video ${id} entregado` });
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
