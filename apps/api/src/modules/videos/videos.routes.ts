import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "Lista de videos" });
});

router.post('/', (req, res) => {
  res.json({ message: "Video creado" });
});

export default router;
