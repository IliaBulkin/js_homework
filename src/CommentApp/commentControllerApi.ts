import { Request, Response } from 'express';
import commentService from './commentService';

async function getCommentByPostId(req: Request, res: Response) {
    const postid = Number(req.params.id);
    const result = await commentService.getCommentsByPostId(postid);

    res.json(result)
}


const commentControllerApi = {
    getCommentByPostId,
};

export default commentControllerApi;