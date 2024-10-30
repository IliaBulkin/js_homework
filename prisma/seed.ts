import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createPost() {
    const post = await prisma.post.create({
        data: {
            name: 'Aboba 1',
            author: 'abobs',
            userId: 1
        }
    })
}

async function createManyPost() {
    const post = await prisma.post.createMany({
        data: [
            {name: 'Aboba 2', author: 'abobss', userId: 2},
            {name: 'Aboba 3', author: 'abobsss', userId: 3},
            {name: 'Aboba 4', author: 'abobssss', userId: 4},
            {name: 'Aboba 5', author: 'abobsssss', userId: 5},
            {name: 'Aboba 6', author: 'abobssssss', userId: 6},
        ] // тут я хотел юзать skipDublicates, посмотреть как работает, но мне выдало ошибку, поэтому без него
        // источник: https://www.prisma.io/docs/orm/prisma-client/queries/crud (там где createMany()), не чатгпт :) 
    })
}

async function updatePost() {
    const post = await prisma.post.update({
        where: {
            id: 2
        },
        data: {
            name: 'updated aboba'
        }
    })
}

async function findPost() {
    const post = await prisma.post.findUnique({
        where: {
            id: 4
        }
    })
}

async function findManyPost() {
    const post = await prisma.post.findMany()
}

async function deletePost() {
    const post = await prisma.post.delete({
        where: {
            id: 3
        }
    })
}

// async function main() {
//     await createPost()
//     await createManyPost()
//     await updatePost()
//     await findPost()
//     await findManyPost()
//     await deletePost()
// }

// main().then(() => {
//     prisma.$disconnect()
// }).catch((error) => {
//     console.log(error)
//     prisma.$disconnect()
// })


// comments

async function createComment() {
    const comment = await prisma.comment.create({
        data: {
            description: "first comment with image",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fopensea.io%2Fassets%2Fmatic%2F0x2953399124f0cbb46d2cbacd8a89cf0599974963%2F103083215453357998406995257530733063189480840992426833397036621675175591542785&psig=AOvVaw3_wD4cSqUfI9ecOoPo47Io&ust=1729457297615000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjyxNCom4kDFQAAAAAdAAAAABAE",
            contact: "aboba@aboba.com",
            postId: 1,
            userId: 1
        }
    })
}

async function createManyComment() {
    const comment = await prisma.comment.createMany({
        data: [
            {description: "first comment without image, createMany", contact: "abobus@aboba.com", postId: 2, userId: 2},
            {description: "second comment without image, createMany", contact: "abulbek@aboba.com", postId: 1, userId: 3},
            {description: "third comment without image, createMany", contact: "adukmook@aboba.com", postId: 2, userId: 4},
        ],
    })
}

async function deleteComment() {
    const comment = await prisma.comment.delete({
        where: {
            id: 3
        },
    })
}

async function findComment() {
    const comment = await prisma.comment.findUnique({
        where: {
            id: 1
        },
        include: {
            post: true, 
        },
    })
}

async function findCommentPrint() {
    const comment = await prisma.comment.findUnique({
        where: {
            id: 1
        },
        include: {
            post: true, 
        },
    })
    if (comment) {
        console.log('comment', comment.description);
        console.log('contact', comment.contact);
        console.log('post', comment.post.name); 
    } else {
        console.log('Comment aboba not found');
    }
}

async function findPostWithComments() {
    const post = await prisma.post.findUnique({
        where: {
            id: 2
        },
        include: {
            comments: true, 
        }
    })
}

async function updateComment() {
    const comment = await prisma.comment.update({
        where: {
            id: 1
        },
        data: {
            description: 'updated aboba comment'
        }
    })
}

async function main() {
    await createComment()
    await createManyComment()
    await deleteComment()
    await findComment()
    await findCommentPrint()
    await findPostWithComments()
    await updateComment()
}

main().then(() => {
    prisma.$disconnect()
}).catch((error) => {
    console.log(error)
    prisma.$disconnect()
})