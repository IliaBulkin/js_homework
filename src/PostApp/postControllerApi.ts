import { postService } from "./postService";
import { Request, Response } from "express";

export async function getAllPosts(req: Request, res: Response){
    const posts = await postService.getAllPosts();
    res.json(posts);
}

const postControllerApi = {
    getAllPosts: getAllPosts,
}

export default postControllerApi