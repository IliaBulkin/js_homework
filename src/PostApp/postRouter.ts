import express from 'express';
import { postController } from './postController';

const router = express.Router()

router.get('/all', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('/create', postController.createPost)

export = router