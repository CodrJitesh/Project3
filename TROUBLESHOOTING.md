# Troubleshooting Guide

Common issues and their solutions for the Employee Leave Management System.

## 🔧 Installation Issues

### Issue: npm install fails

**Symptoms:**
- Error messages during `npm install`
- Missing dependencies
- Version conflicts

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Node version incompatibility

**Symptoms:**
- "Unsupported engine" error
- Syntax errors in dependencies

**Solutions:**
```bash
# Check your Node version
node --version

# Should be v16 or higher
# Update Node.js if needed
# Using nvm (recommended):
nvm install 18
nvm use 18
```

---

## 🗄️ Database Issues

### Issue: MongoDB connection failed

**Symptoms:**
- "MongoServerError: connect ECONNREFUSED"
- "MongooseServerSelectionError"
- Backend crashes on startup

**Solutions:**

**For Local MongoDB:**
```bash
# Check if MongoDB is running
# macOS:
brew services list | grep mongodb

# If not running, start it:
brew services start mongodb-community

# Linux:
sudo systemctl status mongod
sudo systemctl start mongod

# Windows:
# Check Services panel and start MongoDB service
```

**For MongoDB Atlas:**
1. Check connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```
2. Verify username and password (no special characters issues)
3. Check IP whitelist in Atlas dashboard
4. Add `0.0.0.0/0` to allow all IPs (development only)

### Issue: Database seeding fails

**Symptoms:**
- "User validation failed"
- "Duplicate key error"

**Solutions:**
```bash
# Clear existing data
# In MongoDB shell:
use leave-management
db.users.deleteMany({})
db.leaves.deleteMany({})

# Or drop entire database:
db.dropDatabase()

# Then run seed again:
npm run seed
```

---

## 🔐 Authentication Issues

### Issue: JWT token invalid

**Symptoms:**
- "Not authorized, token failed"
- Logged out unexpectedly
- 401 errors on API calls

**Solutions:**
```javascript
// 1. Clear browser storage
localStorage.clear()

// 2. Check JWT_SECRET in .env
// Must be same across restarts

// 3. Check token expiration
// Default is 7 days

// 4. Logout and login again
```

### Issue: Cannot login with default credentials

**Symptoms:**
- "Invalid credentials" error
- Login fails with seeded users

**Solutions:**
```bash
# 1. Verify database was seeded
# Check backend console for seed success message

# 2. Re-run seed script
npm run seed

# 3. Check email and password exactly:
# admin@company.com / admin123
# manager@company.com / manager123
# employee@company.com / employee123

# 4. Check for typos (case-sensitive)
```

---

## 🌐 Network Issues

### Issue: CORS errors

**Symptoms:**
- "Access-Control-Allow-Origin" error
- API calls fail from frontend
- Network errors in console

**Solutions:**

**Check backend CORS configuration:**
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
```

**Check API URL in frontend:**
```javascript
// frontend/src/utils/api.js
const API_URL = 'http://localhost:8000/api';
```

**Verify both servers are running:**
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

### Issue: Port already in use

**Symptoms:**
- "EADDRINUSE: address already in use"
- Server won't start

**Solutions:**

**Find and kill process:**
```bash
# macOS/Linux:
lsof -ti:8000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Or change port:**
```bash
# Backend: Edit .env
PORT=5001

# Frontend: Create .env in frontend/
PORT=3001
```

---

## 🎨 UI/UX Issues

### Issue: Styles not loading

**Symptoms:**
- Plain HTML with no styling
- Tailwind classes not working
- White background instead of dark

**Solutions:**
```bash
# 1. Check if Tailwind is installed
cd frontend
npm list tailwindcss

# 2. Verify tailwind.config.js exists

# 3. Check index.css imports Tailwind
# Should have:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# 4. Restart frontend server
npm start
```

### Issue: Animations not working

**Symptoms:**
- No smooth transitions
- Components appear instantly
- Framer Motion not working

**Solutions:**
```bash
# 1. Check if framer-motion is installed
npm list framer-motion

# 2. If missing, install it:
npm install framer-motion

# 3. Check browser compatibility
# Framer Motion requires modern browsers

# 4. Check console for errors
```

---

## 📱 Responsive Design Issues

### Issue: Mobile layout broken

**Symptoms:**
- Horizontal scrolling
- Elements overflow
- Text too small

**Solutions:**
```html
<!-- Check viewport meta tag in public/index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

```css
/* Check for fixed widths in custom CSS */
/* Use max-width instead of width */
/* Use responsive Tailwind classes */
```

---

## 🔄 State Management Issues

### Issue: User state not persisting

**Symptoms:**
- Logged out on page refresh
- User data disappears
- Need to login repeatedly

**Solutions:**
```javascript
// Check AuthContext.js
// Token should be stored in localStorage

// Verify in browser DevTools:
// Application > Local Storage > http://localhost:3000
// Should see 'token' key

// If missing, check login function:
localStorage.setItem('token', data.token);
```

### Issue: Dashboard not updating after action

**Symptoms:**
- New leave request doesn't appear
- Stats don't update
- Need to refresh page

**Solutions:**
```javascript
// Check if fetchData() is called after actions
// In LeaveFormModal.js:
onSuccess(); // Should trigger parent refresh

// In Dashboard.js:
const fetchData = async () => {
  // Fetch stats and leaves
};

// Call fetchData after modal closes
```

---

## 🚀 Deployment Issues

### Issue: Build fails

**Symptoms:**
- `npm run build` errors
- Compilation errors
- Missing dependencies

**Solutions:**
```bash
# 1. Check for console.log statements
# Remove or comment out

# 2. Check for unused imports
# Remove them

# 3. Check for syntax errors
# Run: npm run build

# 4. Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

### Issue: Environment variables not working in production

**Symptoms:**
- API calls fail
- Features not working
- Blank pages

**Solutions:**
```bash
# For React apps, env vars must start with REACT_APP_
REACT_APP_API_URL=https://your-api.com/api

# Rebuild after changing env vars
npm run build

# For hosting platforms (Vercel, Netlify):
# Set env vars in dashboard
# Redeploy after setting
```

---

## 🐛 Common Errors

### Error: "Cannot read property 'map' of undefined"

**Cause:** Trying to map over data before it's loaded

**Solution:**
```javascript
// Add loading state
const [loading, setLoading] = useState(true);

// Add conditional rendering
{loading ? (
  <div>Loading...</div>
) : (
  data.map(item => ...)
)}

// Or use optional chaining
{data?.map(item => ...)}
```

### Error: "Maximum update depth exceeded"

**Cause:** Infinite loop in useEffect

**Solution:**
```javascript
// Add dependency array
useEffect(() => {
  fetchData();
}, []); // Empty array = run once

// Or add specific dependencies
useEffect(() => {
  fetchData();
}, [userId]); // Run when userId changes
```

### Error: "Cannot POST /api/..."

**Cause:** Route not defined or server not running

**Solution:**
```bash
# 1. Check if backend is running
# Should see: "Server running on port 8000"

# 2. Check route definition in backend
# routes/leaveRoutes.js should have the route

# 3. Check route is mounted in server.js
app.use('/api/leaves', leaveRoutes);

# 4. Check API URL in frontend
# Should match backend URL
```

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend:**
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
```javascript
// Add to api.js
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method, config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);
```

### Check Browser Console

**Look for:**
- Red error messages
- Network tab for failed requests
- Console tab for JavaScript errors
- Application tab for localStorage

### Check Backend Console

**Look for:**
- MongoDB connection status
- Server startup message
- API request logs
- Error stack traces

---

## 📞 Getting Help

If you're still stuck:

1. **Check Documentation**
   - README.md
   - QUICKSTART.md
   - FEATURES.md

2. **Review Code**
   - Compare with working examples
   - Check for typos
   - Verify file paths

3. **Search Error Messages**
   - Copy exact error message
   - Search on Google/Stack Overflow
   - Check GitHub issues

4. **Ask for Help**
   - Provide error messages
   - Share relevant code
   - Describe what you tried
   - Include environment details

---

## ✅ Prevention Checklist

To avoid issues:

- [ ] Use correct Node.js version (v16+)
- [ ] Install all dependencies
- [ ] Configure environment variables
- [ ] Start MongoDB before backend
- [ ] Start backend before frontend
- [ ] Check console for errors
- [ ] Test features after changes
- [ ] Keep dependencies updated
- [ ] Follow setup guide exactly
- [ ] Read error messages carefully

---

## 🎯 Quick Fixes

**90% of issues are solved by:**

1. Restarting servers
2. Clearing cache
3. Reinstalling dependencies
4. Checking environment variables
5. Reading error messages

**Try this first:**
```bash
# Stop all servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm start
```

---

**Still having issues?** Create an issue with:
- Error message
- Steps to reproduce
- Environment details
- What you've tried

We're here to help! 🚀
