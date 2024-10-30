import express, { Request, Response } from 'express';

const postService = require('../PostApp/postService')

function getAllPosts(req: Request, res: Response) {
    const context = postService.getAllPosts()
    res.render('posts', context)
}

function getPostById(req: Request, res: Response) {
    // const context = {
    //     post: post_for_page[req.params.id-1]
    // }
    const id = req.params.id
    const data = postService.getPostById(id)
    if (id <= data.length) {
        res.render('post', data.context)
    } else {
        res.render('error', data.cache)
    }
}

function createPost(req: Request, res: Response) {
    const data = req.body
    postService.createPost(data)
    res.send('doing this shit bro')
}

export = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}