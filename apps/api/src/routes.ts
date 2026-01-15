import { Router } from 'express';

import videoRoutes from './modules/videos/videos.routes.js';
import healthRoutes from "./modules/health/health.routes.js";

const apiRouter = Router();

apiRouter.use('/videos', videoRoutes);
apiRouter.use('/health', healthRoutes);

export default apiRouter;
