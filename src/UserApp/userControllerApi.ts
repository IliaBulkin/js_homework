import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token';
import { sign } from 'jsonwebtoken';

async function authLogin(req: Request, res:Response){
    const data = await req.body
    const result = await userService.login(data.email, data.password)

    res.json({status: 'success', data: result})
}

async function authRegister(req: Request, res: Response){
    const data = await req.body
    const result = await userService.register(data)

    res.json(result)
}

const userControllerApi = {
    authLogin: authLogin,
    authRegister: authRegister
}


export default userControllerApi