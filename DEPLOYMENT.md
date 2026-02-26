# Deployment Guide

## 🚀 Production Deployment

This guide covers deploying the Employee Leave Management System to production.

## Prerequisites

- MongoDB Atlas account (or MongoDB server)
- Node.js hosting (Heroku, Railway, Render, etc.)
- Static hosting for React (Vercel, Netlify, etc.)

---

## Option 1: Deploy to Render + Vercel

### Backend on Render

1. **Create MongoDB Atlas Database**
   ```
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Create database user
   - Whitelist all IPs (0.0.0.0/0) for development
   - Get connection string
   ```

2. **Deploy Backend to Render**
   ```
   - Go to https://render.com
   - Create new Web Service
   - Connect your GitHub repository
   - Configure:
     - Build Command: cd backend && npm install
     - Start Command: cd backend && npm start
     - Environment: Node
   ```

3. **Set Environment Variables on Render**
   ```
   PORT=8000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leave-management
   JWT_SECRET=your_production_secret_key_min_32_chars
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

4. **Deploy and Get URL**
   ```
   - Deploy the service
   - Note the URL (e.g., https://your-app.onrender.com)
   ```

### Frontend on Vercel

1. **Update API URL**
   
   Edit `frontend/src/utils/api.js`:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
   ```

2. **Deploy to Vercel**
   ```
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Create React App
     - Root Directory: frontend
     - Build Command: npm run build
     - Output Directory: build
   ```

3. **Set Environment Variable**
   ```
   REACT_APP_API_URL=https://your-app.onrender.com/api
   ```

4. **Deploy**
   ```
   - Click Deploy
   - Your app will be live at https://your-app.vercel.app
   ```

---

## Option 2: Deploy to Railway

### Full Stack on Railway

1. **Create MongoDB Atlas Database** (same as above)

2. **Deploy to Railway**
   ```
   - Go to https://railway.app
   - Create new project
   - Deploy from GitHub repo
   ```

3. **Configure Backend Service**
   ```
   - Add service for backend
   - Root directory: backend
   - Start command: npm start
   - Add environment variables (same as Render)
   ```

4. **Configure Frontend Service**
   ```
   - Add service for frontend
   - Root directory: frontend
   - Build command: npm run build
   - Start command: npx serve -s build -l $PORT
   - Add REACT_APP_API_URL environment variable
   ```

---

## Option 3: Deploy to Heroku

### Backend

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name-backend
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_secret"
   heroku config:set JWT_EXPIRE="7d"
   heroku config:set NODE_ENV="production"
   ```

4. **Create Procfile**
   ```
   web: node server.js
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Frontend

1. **Update API URL** (same as Vercel)

2. **Deploy to Vercel or Netlify** (follow steps above)

---

## Post-Deployment Steps

### 1. Seed Production Database

```bash
# Connect to your production backend
# Run seed script once
node seed.js
```

Or create users manually through the register endpoint.

### 2. Update CORS Settings

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

### 3. Test All Features

- [ ] User registration
- [ ] User login
- [ ] Leave request creation
- [ ] Leave approval (as manager)
- [ ] User management (as admin)
- [ ] Protected routes
- [ ] Role-based access

### 4. Security Checklist

- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] HTTPS enabled
- [ ] CORS configured for specific domain
- [ ] MongoDB IP whitelist configured
- [ ] Environment variables secured
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all endpoints

---

## Environment Variables Summary

### Backend
```env
PORT=8000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_production_key_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Monitoring & Maintenance

### Logging
- Use services like LogRocket, Sentry, or Datadog
- Monitor API response times
- Track error rates

### Database Backups
- Enable automated backups in MongoDB Atlas
- Schedule: Daily recommended

### Updates
```bash
# Update dependencies regularly
npm outdated
npm update
```

### Performance Optimization
- Enable compression in Express
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries with indexes

---

## Troubleshooting

### CORS Errors
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### MongoDB Connection Issues
- Check connection string format
- Verify database user credentials
- Ensure IP whitelist includes deployment server
- Check network access settings in Atlas

### JWT Token Issues
- Ensure JWT_SECRET is same across deployments
- Check token expiration settings
- Verify Authorization header format

### Build Failures
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are in package.json

---

## Scaling Considerations

### Database
- Use MongoDB Atlas auto-scaling
- Add indexes for frequently queried fields
- Implement connection pooling

### Backend
- Use load balancer for multiple instances
- Implement Redis for session management
- Add API rate limiting

### Frontend
- Use CDN for static assets
- Implement code splitting
- Enable service workers for PWA

---

## Cost Estimation

### Free Tier Options
- **MongoDB Atlas**: 512MB free
- **Render**: 750 hours/month free
- **Vercel**: Unlimited deployments
- **Railway**: $5 credit/month

### Paid Options (Estimated)
- **MongoDB Atlas**: $9/month (Shared M2)
- **Render**: $7/month (Starter)
- **Vercel**: $20/month (Pro)
- **Total**: ~$36/month for small team

---

## Support & Resources

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

---

## Rollback Strategy

### Quick Rollback
```bash
# Render/Railway: Use dashboard to rollback to previous deployment
# Heroku: 
heroku rollback
```

### Database Rollback
- Restore from MongoDB Atlas backup
- Use point-in-time recovery if available

---

## Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and seeded
- [ ] All API endpoints working
- [ ] Authentication functioning
- [ ] Protected routes working
- [ ] Role-based access verified
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Error monitoring setup
- [ ] Backups configured

🎉 **Congratulations! Your app is now live!**
