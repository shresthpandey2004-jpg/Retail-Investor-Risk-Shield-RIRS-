# 🚀 RIRS Vercel Deployment Guide

## Complete Deployment Strategy: Frontend (Vercel) + Backend (Railway)

### 🎯 **Deployment Architecture**
- **Frontend**: Vercel (Next.js client)
- **Backend**: Railway (Node.js API server)
- **Database**: MongoDB Atlas (Cloud)
- **Cache**: Redis Cloud

---

## 📱 **Step 1: Deploy Frontend to Vercel**

### **Method 1: Using Vercel Dashboard (Easiest)**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Import from GitHub: `shresthpandey2004-jpg/Retail-Investor-Risk-Shield-RIRS-`
   - Select **Root Directory**: `client`
   - Framework Preset: **Next.js**

3. **Configure Environment Variables**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at: `https://your-app.vercel.app`

### **Method 2: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: rirs-frontend
# - Directory: ./
```

---

## 🖥️ **Step 2: Deploy Backend to Railway**

### **Method 1: Using Railway Dashboard**

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `shresthpandey2004-jpg/Retail-Investor-Risk-Shield-RIRS-`
   - **Root Directory**: `server`

3. **Configure Environment Variables**
   ```bash
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rirs
   REDIS_URL=redis://username:password@host:port
   JWT_SECRET=your-super-secure-secret-key-min-32-chars
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Railway will auto-deploy
   - Get your backend URL: `https://your-backend.railway.app`

### **Method 2: Using Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Navigate to server directory
cd server

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your_mongodb_uri
# ... add other variables
```

---

## 🗄️ **Step 3: Setup Database (MongoDB Atlas)**

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/atlas
   - Create free cluster

2. **Configure Database**
   - Create database: `rirs`
   - Create user with read/write permissions
   - Whitelist Railway IP addresses

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/rirs?retryWrites=true&w=majority
   ```

---

## 🔄 **Step 4: Connect Frontend to Backend**

1. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` with your Railway backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   ```

2. **Redeploy Frontend**
   - Vercel will auto-redeploy on environment variable changes
   - Or manually trigger: `vercel --prod`

---

## ⚡ **Quick Deployment Commands**

### **Complete Deployment in 5 Minutes**

```bash
# 1. Deploy Frontend to Vercel
cd client
vercel --prod

# 2. Deploy Backend to Railway  
cd ../server
railway login
railway init
railway up

# 3. Update environment variables
# - Set MONGODB_URI in Railway
# - Set NEXT_PUBLIC_API_URL in Vercel

# 4. Test deployment
curl https://your-backend.railway.app/health
curl https://your-app.vercel.app
```

---

## 🔧 **Configuration Files Created**

### **vercel.json** (Root)
```json
{
  "version": 2,
  "name": "rirs-frontend",
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/next"
    }
  ]
}
```

### **client/vercel.json**
```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

### **server/railway.json**
```json
{
  "version": 2,
  "build": {
    "builder": "@railway/nixpacks"
  }
}
```

---

## 🌐 **Custom Domain Setup**

### **For Vercel (Frontend)**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `rirs.com`
3. Configure DNS records as shown

### **For Railway (Backend)**
1. Go to Railway Dashboard → Your Project → Settings → Domains
2. Add custom domain: `api.rirs.com`
3. Update frontend environment variable

---

## 🔒 **Environment Variables Checklist**

### **Vercel (Frontend) Variables**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### **Railway (Backend) Variables**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rirs
REDIS_URL=redis://user:pass@host:port
JWT_SECRET=your-super-secure-secret-key-min-32-chars
FRONTEND_URL=https://your-app.vercel.app
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_sendgrid_key
STRIPE_SECRET_KEY=sk_live_your_stripe_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 🚀 **Post-Deployment Steps**

1. **Test All Endpoints**
   ```bash
   # Health check
   curl https://your-backend.railway.app/health
   
   # Frontend
   curl https://your-app.vercel.app
   ```

2. **Setup Monitoring**
   - Enable Vercel Analytics
   - Setup Railway monitoring
   - Configure error tracking (Sentry)

3. **Configure CORS**
   - Update backend CORS settings with Vercel URL
   - Test cross-origin requests

4. **SSL/HTTPS**
   - Both Vercel and Railway provide automatic HTTPS
   - Ensure all API calls use HTTPS

---

## 🎯 **Expected URLs After Deployment**

- **Frontend**: `https://rirs-frontend.vercel.app`
- **Backend API**: `https://rirs-backend.railway.app`
- **Health Check**: `https://rirs-backend.railway.app/health`
- **API Docs**: `https://rirs-backend.railway.app/api-docs`

---

## 🆘 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**
   ```javascript
   // server/src/index.ts - Update CORS origin
   app.use(cors({
     origin: ['https://your-app.vercel.app'],
     credentials: true
   }));
   ```

2. **Environment Variables Not Loading**
   - Check variable names (case-sensitive)
   - Redeploy after adding variables
   - Use Vercel/Railway dashboard to verify

3. **Build Failures**
   ```bash
   # Check build logs in Vercel/Railway dashboard
   # Common fixes:
   npm install --legacy-peer-deps
   ```

4. **Database Connection Issues**
   - Whitelist Railway IP in MongoDB Atlas
   - Check connection string format
   - Test connection locally first

---

## 💰 **Cost Estimation**

### **Free Tier Limits**
- **Vercel**: 100GB bandwidth, unlimited deployments
- **Railway**: $5/month after free trial
- **MongoDB Atlas**: 512MB free tier
- **Redis Cloud**: 30MB free tier

### **Scaling Costs**
- **Vercel Pro**: $20/month per member
- **Railway**: Pay-as-you-go ($0.000463/GB-hour)
- **MongoDB Atlas**: $9/month for 2GB
- **Redis Cloud**: $7/month for 250MB

---

## 🎉 **Success!**

After following these steps, your RIRS SaaS platform will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`

The deployment is production-ready with:
- ✅ Automatic HTTPS
- ✅ Global CDN (Vercel)
- ✅ Auto-scaling
- ✅ Continuous deployment from Git
- ✅ Environment variable management
- ✅ Custom domain support

**Total deployment time: ~10 minutes** ⚡