// Импорт не используется, нужно убрать
import express, { Express, Request, Response } from 'express'
import userService from '../UserApp/userService';
// Импорт не используется, нужно убрать
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

function login(req: Request, res: Response){
    res.render('login')
}

function registration(req: Request, res: Response){
    res.render('registration')
}

async function authLogin(req: any, res: any) {
    try {
        const { username, password } = req.body;
        const user = await userService.login(username, password);
        
        if (user) {
            res.cookie('user', JSON.stringify(user));
            return res.status(200).json({ message: 'Login successful', user });
            
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function authRegistration(req: any, res: any) {
    try {
        const { email, password, username } = req.body;
        const registrationResult = await userService.register({ email, password, username });
        if (registrationResult.status === "error") {
            return res.status(409).json({ message: 'User already exists' });
        } else if (registrationResult) {
            res.cookie('user', JSON.stringify(registrationResult));
            return res.status(201).json({ message: 'Registration successful', user: registrationResult });
        } else {
            return res.status(500).json({ message: 'Registration failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function authUser(req: Request, res: Response){
    const data = req.body
    const user = await userService.authUser(data.email, data.password)

    if (!user || user === 'error' || typeof user !== 'object' || !('data' in user)) {
        return res.status(401).json({ message: 'Auth fail' });
    }
    
    // const token = sign(user, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', user.data)
    res.status(200).json({ message: 'auth', token: user.data });
}

const userController = {
    login: login,
    registration: registration,
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userController