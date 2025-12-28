import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/subscription
// @desc    Get subscription info
// @access  Private
router.get('/', auth, async (req, res) => {
  res.json({
    success: true,
    message: 'Subscription routes - Coming soon',
    data: { subscription: {} }
  });
});

export default router;