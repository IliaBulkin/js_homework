import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createPost() {
    const post = await prisma.post.create({
        data: {
            name: 'Aboba 1',
            author: 'abobs'
        }
    })
}

async function createManyPost() {
    const post = await prisma.post.createMany({
        data: [
            {name: 'Aboba 2', author: 'abobss'},
            {name: 'Aboba 3', author: 'abobsss'},
            {name: 'Aboba 4', author: 'abobssss'},
            {name: 'Aboba 5', author: 'abobsssss'},
            {name: 'Aboba 6', author: 'abobssssss'},
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

async function main() {
    await createPost()
    await createManyPost()
    await updatePost()
    await findPost()
    await findManyPost()
    await deletePost()
}

main().then(() => {
    prisma.$disconnect()
}).catch((error) => {
    console.log(error)
    prisma.$disconnect()
})