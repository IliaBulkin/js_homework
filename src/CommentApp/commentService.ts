import commentRepository from "./commentRepository"
import { Prisma } from '@prisma/client'

interface IComment {
    id: number
    contact: string
    description: string
    image?: string | null
    postId: number
    userId: number
}

interface ICommentSuccess {
    status: 'success'
    data: IComment
}

interface ICommentError {
    status: 'error'
    message: string
}

interface ICommentsSuccess {
    status: 'success'
    data: IComment[]
}

async function createComment(data: Prisma.CommentCreateInput): Promise<ICommentSuccess | ICommentError> {
    try {
        const comment = await commentRepository.createComment(data)
        if (!comment) {
            return { status: 'error', message: 'Failed to create comment' }
        }
        return { status: 'success', data: comment }
    } catch (error) {
        console.error('Error creating comment:', error);
        return { status: 'error', message: 'Internal server error' }
    }
}

async function getCommentsByPostId(postid: number): Promise<ICommentsSuccess | ICommentError> {
    try {
        const comments = await commentRepository.getCommentsByPostId(postid)
        if (!comments) {
            return { status: 'error', message: 'Comments not found' }
        }
        return { status: 'success', data: comments }
    } catch (error) {
        console.error('Error fetching comments:', error)
        return { status: 'error', message: 'Internal server error' }
    }
}

const commentService = {
    getCommentsByPostId,
    createComment,
}

export default commentService