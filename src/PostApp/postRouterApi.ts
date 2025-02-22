import  { Router } from 'express'
import postControllerApi from './postControllerApi';

const router = Router();

router.get('/all', postControllerApi.getAllPosts)

export default router;