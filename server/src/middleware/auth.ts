import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    plan: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as any;
    
    // Check if user still exists
    const user = await User.findById(decoded.userId).select('email plan');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    req.user = {
      userId: decoded.userId,
      email: user.email,
      plan: user.plan
    };
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Middleware to check subscription plan
export const requirePlan = (requiredPlan: 'pro' | 'enterprise') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const planHierarchy = { free: 0, pro: 1, enterprise: 2 };
    const userPlanLevel = planHierarchy[req.user.plan as keyof typeof planHierarchy] || 0;
    const requiredPlanLevel = planHierarchy[requiredPlan];

    if (userPlanLevel < requiredPlanLevel) {
      return res.status(403).json({
        success: false,
        message: `${requiredPlan} plan required for this feature`,
        upgradeRequired: true,
        currentPlan: req.user.plan,
        requiredPlan
      });
    }

    next();
  };
};