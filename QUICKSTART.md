# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` file:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

Or use MongoDB Atlas (cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Step 4: Seed Database

```bash
cd backend
npm run seed
```

This creates default users:
- **Admin**: admin@company.com / admin123
- **Manager**: manager@company.com / manager123
- **Employee**: employee@company.com / employee123

### Step 5: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on http://localhost:3000

### Step 6: Login and Explore

1. Open http://localhost:3000
2. Login with any default credentials
3. Explore the features based on role:
   - **Employee**: Request leave, view status
   - **Manager**: Approve/reject team leaves
   - **Admin**: Manage all users and leaves

## 🎨 UI Highlights

- **Circular Stats**: Unique connected circles showing leave statistics
- **Multi-step Form**: Smooth sliding form for leave requests
- **Dark Mode**: Beautiful dark-first design
- **Animations**: Subtle, professional animations throughout

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

### Port Already in Use
- Change PORT in backend/.env
- Update API_URL in frontend/src/utils/api.js

### CORS Errors
- Ensure backend is running on port 8000
- Check CORS configuration in backend/server.js

## 📱 Testing Different Roles

1. **Test as Employee:**
   - Login as employee@company.com
   - Request a leave
   - View leave status

2. **Test as Manager:**
   - Login as manager@company.com
   - Go to Approvals
   - Approve/reject employee's leave

3. **Test as Admin:**
   - Login as admin@company.com
   - Access all features
   - View Users page

## 🎯 Next Steps

- Customize the color scheme in `frontend/tailwind.config.js`
- Add more leave types in `frontend/src/components/LeaveFormModal.js`
- Extend user roles and permissions
- Add email notifications
- Deploy to production

Enjoy building! 🎉
