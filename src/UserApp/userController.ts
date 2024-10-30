import express, { Express, Request, Response } from 'express'
import userService from '../UserApp/userService';

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
        if (registrationResult === "User exists") {
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

const userController = {
    login: login,
    registration: registration,
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userController