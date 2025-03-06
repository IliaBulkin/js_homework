import userRepository from '../UserApp/userRepository';
// Импорт не используется, нужно убрать
import { Prisma } from "@prisma/client"
import { IError, ISuccess } from '../types/types'
import { IUser } from './types'
// Импорт не используется, нужно убрать
import { sign } from "jsonwebtoken";
// Импорт не используется, нужно убрать
import { SECRET_KEY } from "../config/token";
import { compare, hash } from "bcrypt"
// any...
async function login(email: any, password: any) {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        return user;
    }
}
// Вместо any используем типы из призмы
async function register(userData: any): Promise< IError | ISuccess<IUser> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    // а переменная existingUser?
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
    // ну не используется же Илья, ну светит серым блин
    // перед созданием newUser переносишь переменную и передаешь вместо userData.password
    const hashedPassword = await hash(userData.password, 10)
    return {status: "success", data: createdUser};
}

async function authUser(email: string, password: string) {
    let user = await userRepository.findUserByEmail(email);
    if (!user){
        return "error";
    }

    // if (user.password != password){
    //     return "error";
    // }

    // return user;
    const isMatch = await compare(password, user.password)

    if (!isMatch){
        return {status: 'error', message: 'nepravilniy password'};
    }
    // вот здесь токен нужно делать ну или хотя бы юзера ретурнить 
}   

const userService = {
    login: login,
    register: register,
    authUser: authUser
}

export default userService