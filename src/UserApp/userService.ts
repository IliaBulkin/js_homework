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

    if (existingUser) {
        return {status: "error", message: "User exists"};
    }
    
    const hashedPassword = await hash(userData.password, 10)
    const newUser = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    }

    const createdUser = await userRepository.createUser(newUser)
    return {status: "success", data: createdUser};
}

async function authUser(email: string, password: string) {
    let user = await userRepository.findUserByEmail(email);
    if (!user){
        return "error";
    }

    const isMatch = await compare(password, user.password)

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