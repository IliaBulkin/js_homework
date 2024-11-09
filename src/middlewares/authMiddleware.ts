import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/token';

function authMiddleware(req: any, res: any, next: any) {
    const user = req.cookies.user;
    if (user && user.email && user.username && user.role) {
        if (user.token){
            const token = verify(user.token, SECRET_KEY)
            res.locals.user = token
        }
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
}

export default authMiddleware;