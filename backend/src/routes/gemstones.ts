import { Router, Response } from 'express';
import { verifyToken, AuthRequest } from '../middleware/auth';
import { gemstones, calculateRecommendation, checkCompatibility } from '../services/astrologyService';

const router = Router();

// All routes below are protected
router.use(verifyToken as any);

// GET /api/gemstones
router.get('/', (_req: AuthRequest, res: Response) => {
  return res.json({ success: true, data: gemstones });
});

// GET /api/gemstones/:id
router.get('/:id', (req: AuthRequest, res: Response) => {
  const gem = gemstones.find(g => g.id === req.params.id);
  if (!gem) return res.status(404).json({ success: false, message: 'Gemstone not found.' });
  return res.json({ success: true, data: gem });
});

// POST /api/gemstones/recommend
router.post('/recommend', (req: AuthRequest, res: Response) => {
  const { name, day, month, year, focus } = req.body;
  if (!name || !day || !month || !year || !focus) {
    return res.status(400).json({ success: false, message: 'All fields are required: name, day, month, year, focus.' });
  }
  const result = calculateRecommendation({ name, day: Number(day), month: Number(month), year: Number(year), focus });
  return res.json({ success: true, data: result });
});

// POST /api/gemstones/compatibility
router.post('/compatibility', (req: AuthRequest, res: Response) => {
  const { gem1Id, gem2Id } = req.body;
  if (!gem1Id || !gem2Id) {
    return res.status(400).json({ success: false, message: 'gem1Id and gem2Id are required.' });
  }
  const result = checkCompatibility(gem1Id, gem2Id);
  return res.json({ success: true, data: result });
});

export default router;
