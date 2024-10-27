import { Request, Response, NextFunction } from 'express';

function userRoleMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = req.cookies.user; 
    if (user && user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
}

export default userRoleMiddleware;