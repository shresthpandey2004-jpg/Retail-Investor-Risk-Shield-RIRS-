import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get user portfolios
// @access  Private
router.get('/', auth, async (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio routes - Coming soon',
    data: { portfolios: [] }
  });
});

export default router;