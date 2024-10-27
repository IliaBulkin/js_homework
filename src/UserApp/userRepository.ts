const db = require('../db/dev.db');

async function findUserByEmail(email: any) {
    try {
        const user = await db('users').where({ email }).first();
        if (user) {
            return user;
        } else {
            return "Not Found";
        }
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database query failed');
    }
}

async function createUser(userData: any) {
    try {
        const [createdUser] = await db('users')
            .insert(userData)
            .returning(['id', 'username', 'email', 'role']); // чатгпт, честно
        
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}