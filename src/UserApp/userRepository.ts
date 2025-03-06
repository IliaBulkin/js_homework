// import client from "../client/prismaClient"; вот так надо импортировать клиента

// require, да
const { PrismaClient } = require('@prisma/client');
// на кой черт тебе client папка... там же твой клиент призмы, оттуда его IMPORT, а не require 
const prisma = new PrismaClient();
// и если правильно импортировать, то и типизация появится
async function findUserByEmail(email: string) {
    try {
        // здесь меняешь на импортированого клиента и куча ошибок повылазит вот их то и нужно решать
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user 
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database query failed');
    }
}
// any
async function createUser(userData: any) {
    try {
        const { username, email, password, role } = userData;

        const createdUser = await prisma.user.create({
            data: {
                username,
                email,
                password, 
                role,
            },
        });

        return createdUser; 
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}

const userRepository = {
    findUserByEmail: findUserByEmail,
    createUser: createUser
}

export default userRepository