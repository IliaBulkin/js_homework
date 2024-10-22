import express, { Request, Response } from 'express';

// const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/all', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('/create', postController.createPost)

export = router