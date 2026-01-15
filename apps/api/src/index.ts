import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from './config/prisma.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      database: "Disconnected",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "API Funcionando", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
  console.log(`🏥 Prueba la conexión en http://localhost:${PORT}/health`);
});
