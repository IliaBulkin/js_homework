import { Prisma, PrismaClient } from '@prisma/client';
import client from '../client/prismaClient';

async function getAllPosts(){
    try{
        let post = await client.post.findMany({})
        return post
    } catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code == 'P2002'){
                console.log(err.message);
                throw err;
            }
        }
    }
}

async function getPostById(id: number){
    try {
        let post = await client.post.findUnique({
            where:{
                id: id
            } 
        })
        return post
    } catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code == 'P2015'){
                console.log(error.message);
                throw error;
            }
        }
    }
}


async function createPost(data: Prisma.PostCreateInput){
    try {
        let post = await client.post.create({
            data: data
        })
        return post
    } catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code == 'P2019'){
                console.log(error.message);
                throw error;
            }
        }
    }
}  


const productRepository = {
    getAllProducts:getAllPosts
}
export default productRepository