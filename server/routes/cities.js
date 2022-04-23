import express from 'express';
import { getcities, filter } from '../controllers/posts.js';
const router = express.Router();
router.get('/cities', getcities);
router.post('/filter', filter);

export default router;