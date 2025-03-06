// Request, Response Импорт не используется, нужно убрать
import express, { Request, Response } from 'express';

// const express = require('express')
const router = express.Router()
// ну серьезно require? 
const postController = require('../PostApp/postController')

router.get('/all', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('/create', postController.createPost)

export = router