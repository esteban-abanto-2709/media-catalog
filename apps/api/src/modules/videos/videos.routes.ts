import { Router } from 'express';
import * as VideoController from './videos.controller.js';

const router = Router();

router.get('/', VideoController.getAllVideos);
router.get('/scanVideos', VideoController.scanVideos);
router.get('/:id', VideoController.getVideoById);
router.get('/:id/stream', VideoController.streamVideo);
router.patch('/:id', VideoController.updateVideo);

export default router;
