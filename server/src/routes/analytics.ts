import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/analytics
// @desc    Get analytics data
// @access  Private
router.get('/', auth, async (req, res) => {
  res.json({
    success: true,
    message: 'Analytics routes - Coming soon',
    data: { analytics: {} }
  });
});

export default router;