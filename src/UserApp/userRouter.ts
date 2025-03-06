import authMiddleware from '../middlewares/authMiddleware';
import userControllers from './userController';
import { Router } from 'express';
import userControllerApi from './userControllerApi'

const router = Router();

// router.get('/login', userControllers.login);
// router.post('/login', userControllers.authLogin); 
// Да емае это post запроса
// да и почему два разных по одной ссылке
router.get('/login', userControllerApi.authLogin)
router.get('/login', userControllerApi.authRegister)
router.get('/me', authMiddleware)
// router.post('/registration', userControllers.authRegistration);
// router.post('/login', authMiddleware);

export default router