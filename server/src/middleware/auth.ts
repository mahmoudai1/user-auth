import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { responseHandler } from '../utils/response';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return responseHandler(res, 401, `Access denied`);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'string' || !decoded.id || !decoded.username) {
      return responseHandler(res, 401, `Invalid token structure`);
    }

    req.user = decoded as { id: string; username: string };
    next();
  } catch (error: any) {
    return responseHandler(res, 401, `Invalid token: ${error.message}`);
  }
};