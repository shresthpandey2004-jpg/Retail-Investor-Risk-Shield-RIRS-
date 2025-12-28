import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { config } from './config/config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import portfolioRoutes from './routes/portfolio';
import riskRoutes from './routes/risk';
import alertRoutes from './routes/alerts';
import subscriptionRoutes from './routes/subscription';
import analyticsRoutes from './routes/analytics';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://rirs.com', 'https://www.rirs.com']
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(config.mongoUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('MongoDB connection error:', error));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'RIRS API Server'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 RIRS Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;