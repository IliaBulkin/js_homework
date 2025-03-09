import { IError, ISuccess } from '../types/types'
import postRepository from './postRepository'
import { Post, CreatePost } from './types'

export async function getAllPosts(): Promise< ISuccess<Post[]> | IError > {
    const context = await postRepository.getAllPosts()

    if (!context){
        return {status: "error", message: 'Posts Not Found'}
    }

    return {status: "success", data: context}
}

export async function getPostById(id: number) {
    const context = await postRepository.getPostById(id);
    
    if (!context){
        return {status: "error", message: 'Post Not Found'}
    }

    return {status: "success", data: context}
}

export async function createPost(data: CreatePost): Promise< ISuccess<Post> | IError > {
    let post = await postRepository.createPost(data);
    if (!post){
        return {status: "error", message: 'Post Creation Error'}
    }
    return {status: "success", data: post}
}

export const postService = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}