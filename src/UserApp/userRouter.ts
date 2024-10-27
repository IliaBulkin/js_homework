import authMiddleware from '../middlewares/authMiddleware';
import userControllers from './userController';
import { Router } from 'express';

const router = Router();

router.post('/login', userControllers.registration);
router.get('/login', userControllers.login);
router.post('/post/create', authMiddleware); 

export default router;