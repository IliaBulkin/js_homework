const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUserByEmail(email: string) {
    try {
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