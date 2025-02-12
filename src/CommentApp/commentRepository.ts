import { Prisma, PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function createComment(data: Prisma.CommentCreateInput) {
    try {
        const comment = await client.comment.create({ data })
        return comment
    } catch (error) {
        console.error('Error creating comment:', error)
        return null
    }
}

async function getCommentsByPostId(postid: number) {
    try {
        const comments = await client.comment.findMany({
            where: {
                postId: postid,
            },
        })
        return comments;

    } catch (error) {
        console.error('Error fetching comments:', error)
        return null
    }
}

const commentRepository = {
    getCommentsByPostId,
    createComment,
}

export default commentRepository