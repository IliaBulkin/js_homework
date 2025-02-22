import { Request, Response } from 'express';
import postService from './postService';

async function getAllPostsController(req: Request, res: Response) {
    const context = await postService.getAllPosts(5);
    res.json(context);
}

const postControllerApi = {
    getAllPosts: getAllPostsController,
};

export default postControllerApi;