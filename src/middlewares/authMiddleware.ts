import { Request, Response, NextFunction } from 'express';

function authMiddleware(req: any, res: any, next: any) {
    const user = req.cookies.user;
    if (user && user.email && user.username && user.role) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
}

export default authMiddleware;