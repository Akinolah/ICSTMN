import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const superAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  // Only allow adminIndex 0 (Admin 1)
  const user = (req as any).user;
  if (user && user.isAdmin && user.adminIndex === 0) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};