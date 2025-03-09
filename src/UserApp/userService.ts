import userRepository from '../UserApp/userRepository';
import { IError, ISuccess } from '../types/types'
import { User } from './types'
import { compare, hash } from "bcrypt"
import { SECRET_KEY } from '../config/token';
import { sign } from 'jsonwebtoken';

async function login(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        return user;
    }
}

async function register(userData: User): Promise< IError | ISuccess<User> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (!existingUser) {
        const hashedPassword = await hash(userData.password, 10)
        const newUser = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            role: userData.role
        }
    
        const createdUser = await userRepository.createUser(newUser)
        if (!createdUser){
            return {"status": "error", message: "User creation error"}
        }
        const token = sign({id: createdUser.id}, SECRET_KEY, {expiresIn: '1h'})
        return {status: "success", data: createdUser};
    }

    return {status: 'error', message: 'User already exists'};
}

async function authUser(userData: User) {
    let user = await userRepository.findUserByEmail(userData.email);
    if (!user){
        return "error";
    }

    const isMatch = await compare(user.password, user.password)

    if (!isMatch){
        return {status: 'error', message: 'nepravilniy password'};
    }
    
    const token = sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'})
}   

const userService = {
    login: login,
    register: register,
    authUser: authUser
}

export default userService