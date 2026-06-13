import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Fallback secret for local dev — override with JWT_SECRET env variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'astrogem-secret-key-2024';

// Extend Express Request to carry the decoded user payload after verification
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

// Generate a signed JWT valid for 7 days
export const generateToken = (payload: { id: string; email: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware: verifies Bearer token on protected routes
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};
