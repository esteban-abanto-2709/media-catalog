import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev')); 
app.use(express.json());

app.use(apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
  console.log(`🏥 Prueba la conexión en http://localhost:${PORT}/health`);
});
