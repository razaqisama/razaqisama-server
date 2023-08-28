import { verifyToken } from "../../utils/jwt";
import { NextFunction, Response } from "express";
import { AuthRequest } from '@/types/express';

export default async function authenticateToken (req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = await verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};