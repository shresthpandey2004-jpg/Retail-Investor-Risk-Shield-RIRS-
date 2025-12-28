import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/alerts
// @desc    Get user alerts
// @access  Private
router.get('/', auth, async (req, res) => {
  res.json({
    success: true,
    message: 'Alerts routes - Coming soon',
    data: { alerts: [] }
  });
});

export default router;