import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { User as UserModel } from '../authentication/userModel';

export interface AuthRequest extends Request {
  user?: UserModel;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
      const user: UserModel | null = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default authMiddleware;