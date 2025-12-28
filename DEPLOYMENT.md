# RIRS Deployment Guide

This guide covers different deployment options for the Retail Investor Risk Shield (RIRS) SaaS platform.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 80, 443, 3000, 5000, 6379, 27017 available

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd rirs-saas

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env.local

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Deployment
```bash
# Build and start production containers
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Scale services if needed
docker-compose up -d --scale server=3
```

## ☁️ Cloud Deployment Options

### 1. Vercel + Railway (Recommended for MVP)

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod
```

#### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
cd server
railway login
railway init
railway up
```

### 2. AWS Deployment

#### Using AWS ECS + RDS + ElastiCache
```bash
# Build and push Docker images
docker build -t rirs-server ./server
docker build -t rirs-client ./client

# Tag and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag rirs-server:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/rirs-server:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/rirs-server:latest
```

### 3. Google Cloud Platform

#### Using Cloud Run + Cloud SQL + Memorystore
```bash
# Build and deploy to Cloud Run
gcloud builds submit --tag gcr.io/PROJECT-ID/rirs-server ./server
gcloud run deploy --image gcr.io/PROJECT-ID/rirs-server --platform managed
```

### 4. DigitalOcean App Platform

#### Using App Spec
```yaml
# app.yaml
name: rirs-saas
services:
- name: server
  source_dir: /server
  github:
    repo: your-org/rirs-saas
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  
- name: client
  source_dir: /client
  github:
    repo: your-org/rirs-saas
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

## 🔧 Environment Configuration

### Server Environment Variables
```bash
# Production settings
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rirs
REDIS_URL=redis://username:password@host:port

# Security
JWT_SECRET=your-super-secure-secret-key-min-32-chars

# Email
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your-sendgrid-api-key

# Payments
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
RAZORPAY_KEY_SECRET=your_razorpay_secret

# External APIs
ALPHA_VANTAGE_API_KEY=your_api_key
NEWS_API_KEY=your_news_api_key
```

### Client Environment Variables
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.rirs.com

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 🔒 Security Checklist

### Before Production Deployment

- [ ] Change all default passwords
- [ ] Use strong JWT secrets (min 32 characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database authentication
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Enable backup strategies
- [ ] Configure error tracking (Sentry)

### SSL/TLS Configuration
```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d rirs.com -d www.rirs.com
```

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Log Management
```bash
# View application logs
docker-compose logs -f server
docker-compose logs -f client

# Rotate logs
logrotate -f /etc/logrotate.d/rirs
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Your deployment script here
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers (Nginx, AWS ALB)
- Scale server instances based on CPU/memory usage
- Implement database read replicas
- Use CDN for static assets

### Performance Optimization
- Enable Redis caching
- Optimize database queries
- Compress API responses
- Use image optimization
- Implement lazy loading

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check MongoDB connection
   docker-compose logs mongodb
   ```

2. **Redis Connection Issues**
   ```bash
   # Check Redis status
   docker-compose exec redis redis-cli ping
   ```

3. **API Not Responding**
   ```bash
   # Check server logs
   docker-compose logs server
   ```

### Health Checks
```bash
# Check all services
curl http://localhost:5000/health
curl http://localhost:3000/api/health
```

## 📞 Support

For deployment support:
- Email: devops@rirs.com
- Documentation: https://docs.rirs.com
- Discord: https://discord.gg/rirs