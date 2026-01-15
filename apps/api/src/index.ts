import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para entender JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Hola desde Express 5 con TypeScript!",
    status: "OK"
  });
});

// Ejemplo de ruta con parámetros (usando el tipado de Express)
app.get('/videos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    videoId: id,
    action: "get_video"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
