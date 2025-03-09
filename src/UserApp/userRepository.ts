// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

import client from "../client/prismaClient"
import { User } from './types'

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
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

async function createUser(userData: User) {
    try {
        const { username, email, password, role } = userData;

        const createdUser = await client.user.create({
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