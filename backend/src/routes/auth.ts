import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

const router = Router();

// In-memory user store — sufficient for demo; replace with a DB for production
interface User { id: string; name: string; email: string; passwordHash: string; }
const users: User[] = [];

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }
    const passwordHash = await bcrypt.hash(password, 10); // bcrypt with 10 salt rounds
    const user: User = { id: Date.now().toString(), name, email, passwordHash };
    users.push(user);
    const token = generateToken({ id: user.id, email: user.email });
    return res.status(201).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = generateToken({ id: user.id, email: user.email });
    return res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

export default router;
