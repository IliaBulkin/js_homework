import express, { Request, Response } from 'express';
import { postService } from './postService';

export async function getAllPosts(req: Request, res: Response) {
    const context = await postService.getAllPosts()
    if (context.status == "error"){
        res.send("error")
    } else{
        res.render('posts', context)
    }
}

export async function getPostById(req: Request, res: Response) {
    const id: string = req.params.id
    const context = await postService.getPostById(+id);

    if (context.status == "error"){
        res.send("error")
    } else{
        res.render('post', context)
    }
}

export async function createPost(req: Request, res: Response) {
    let post = await postService.createPost(req.body);
    if (post.status == "error"){
        res.send("error")
    } else{
        res.send("success");
    }
}

export const postController = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}