import authMiddleware from '../middlewares/authMiddleware';
import userControllers from './userController';
import { Router } from 'express';

const router = Router();

router.get('/login', userControllers.login);
router.post('/login', userControllers.authLogin); 
router.post('/registration', userControllers.authRegistration);
router.post('/login', authMiddleware);

export default router