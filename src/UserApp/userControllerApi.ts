import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token';
import { sign } from 'jsonwebtoken';

async function authLogin(req: Request, res:Response){
    const data = await req.body
    const result = await userService.login(data.email, data.password)
    if (result.status == 'error') {
        res.json(result)
        return
    }
    
    const token = sign(result.data, SECRET_KEY, {expiresIn: '1h'})
    res.json({status: 'success', data: token})
    
}

async function authRegister(req: Request, res: Response){
    const data = await req.body
    const result = await userService.register(data)
    if (result.status == 'error') {
        res.json(result)
        return
    }

    const token = sign(result.data, SECRET_KEY, {expiresIn: '1h'})
    res.json({status: 'success', data: token})
    
}

const userController = {
    authLogin: authLogin,
    authRegister: authRegister
}


export default userController