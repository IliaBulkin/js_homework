import { postService } from "./postService";
import { Request, Response } from "express";

export async function getAllPosts(req: Request, res: Response){
    const posts = await postService.getAllPosts();
    res.json(posts);
}

export async function getPostById(req: Request, res: Response){
    const id = req.params.id;
    const post = await postService.getPostById(+id);
    res.json(post);
}

const postControllerApi = {
    getAllPosts: getAllPosts,
    getPostById: getPostById
}

export default postControllerApi