import { Request, Response } from 'express';
import postService from './postService';

async function getAllPostsController(req: Request, res: Response) {
    // ну какое 5, из route параметров берем же id
    const context = await postService.getAllPosts(5);
    res.json(context);
}

const postControllerApi = {
    getAllPosts: getAllPostsController,
};

export default postControllerApi;