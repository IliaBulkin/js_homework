import userRepository from '../UserApp/userRepository';
import { Prisma } from "@prisma/client"
import { IError, ISuccess } from '../types/types'
import { IUser } from './types'

async function login(email: any, password: any) {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        return user;
    }
}

async function register(userData: any): Promise< IError | ISuccess<IUser> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (await userRepository.findUserByEmail(userData.email) !== "Not Found") {
        return {status: "error", message: "User exists"};
    }
    const newUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role
    };
    const createdUser = await userRepository.createUser(newUser);
    return {status: "success", data: createdUser};
}

async function authUser(email: string, password: string) {
    let user = await userRepository.findUserByEmail(email);
    if (!user){
        return "error";
    }

    if (user.password != password){
        return "error";
    }

    return user;
}   

const userService = {
    login: login,
    register: register,
    authUser: authUser
}

export default userService