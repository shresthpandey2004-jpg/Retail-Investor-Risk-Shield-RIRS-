import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rirs',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',
  
  // Email
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  emailUser: process.env.EMAIL_USER || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  
  // Payment Gateways
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  
  // External APIs
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
  newsApiKey: process.env.NEWS_API_KEY || '',
  
  // WhatsApp Integration
  whatsappApiKey: process.env.WHATSAPP_API_KEY || '',
  whatsappPhoneNumber: process.env.WHATSAPP_PHONE_NUMBER || '',
  
  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // File Upload
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['csv', 'xlsx', 'xls'],
  
  // Rate Limiting
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100, // requests per window
  
  // Subscription Plans
  plans: {
    free: {
      name: 'Free',
      price: 0,
      features: ['Basic Risk Score', 'Limited Alerts', '1 Portfolio'],
      limits: {
        portfolios: 1,
        alerts: 10,
        riskScans: 5
      }
    },
    pro: {
      name: 'Pro',
      price: 2900, // ₹29 in paisa
      priceUSD: 2900, // $29 in cents
      features: [
        'Advanced Risk AI',
        'Scam Detection',
        'Emotional Trading Guard',
        'Unlimited Alerts',
        'Priority Support'
      ],
      limits: {
        portfolios: 10,
        alerts: -1, // unlimited
        riskScans: -1
      }
    },
    enterprise: {
      name: 'Enterprise',
      price: 'custom',
      features: [
        'White-label Solution',
        'Broker Integration',
        'Custom Analytics',
        'Dedicated Support',
        'API Access'
      ],
      limits: {
        portfolios: -1,
        alerts: -1,
        riskScans: -1
      }
    }
  }
};