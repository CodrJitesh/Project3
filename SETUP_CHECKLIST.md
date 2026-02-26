# Setup Checklist

Use this checklist to ensure your Employee Leave Management System is properly set up.

## ✅ Pre-Installation

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] Git installed (optional, for version control)
- [ ] Code editor installed (VS Code recommended)

## ✅ Backend Setup

### Installation
- [ ] Navigated to backend directory (`cd backend`)
- [ ] Installed dependencies (`npm install`)
- [ ] Created .env file (`cp .env.example .env`)

### Configuration
- [ ] Set PORT in .env (default: 8000)
- [ ] Set MONGODB_URI in .env
  - Local: `mongodb://localhost:27017/leave-management`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/leave-management`
- [ ] Set JWT_SECRET in .env (min 32 characters)
- [ ] Set JWT_EXPIRE in .env (default: 7d)
- [ ] Set NODE_ENV in .env (development)

### Database
- [ ] MongoDB service is running
  - macOS: `brew services list | grep mongodb`
  - Linux: `sudo systemctl status mongod`
  - Windows: Check Services panel
- [ ] Can connect to MongoDB
  - Test: `mongosh` (for local)
  - Test: Check Atlas dashboard (for cloud)

### Seeding
- [ ] Run seed script (`npm run seed`)
- [ ] Verify default users created
  - Admin: admin@company.com / admin123
  - Manager: manager@company.com / manager123
  - Employee: employee@company.com / employee123

### Testing Backend
- [ ] Start backend server (`npm run dev`)
- [ ] Server running on http://localhost:8000
- [ ] No error messages in console
- [ ] Test API endpoint: http://localhost:8000/
  - Should return: `{"message": "Leave Management API"}`

## ✅ Frontend Setup

### Installation
- [ ] Navigated to frontend directory (`cd frontend`)
- [ ] Installed dependencies (`npm install`)

### Configuration
- [ ] Verify API_URL in `src/utils/api.js`
  - Should be: `http://localhost:8000/api`

### Testing Frontend
- [ ] Start frontend server (`npm start`)
- [ ] App opens in browser at http://localhost:3000
- [ ] No error messages in console
- [ ] No compilation errors

## ✅ Integration Testing

### Authentication
- [ ] Can access login page (http://localhost:3000/login)
- [ ] Can access register page (http://localhost:3000/register)
- [ ] Can register new user
- [ ] Can login with default credentials
- [ ] Redirected to dashboard after login
- [ ] User info displayed in navbar
- [ ] Can logout successfully

### Employee Features
- [ ] Login as employee@company.com
- [ ] Dashboard loads correctly
- [ ] Stats circles display properly
- [ ] Can click "Request Leave" button
- [ ] Modal opens with multi-step form
- [ ] Can select leave type
- [ ] Can select dates
- [ ] Can enter reason
- [ ] Can submit leave request
- [ ] Success notification appears
- [ ] New request appears in recent list
- [ ] Stats update correctly

### Manager Features
- [ ] Login as manager@company.com
- [ ] Can access Approvals page
- [ ] Can see team leave requests
- [ ] Can filter by status (Pending/Approved/Rejected)
- [ ] Can click Review button
- [ ] Review modal opens
- [ ] Can add comment
- [ ] Can approve leave
- [ ] Can reject leave
- [ ] Status updates correctly
- [ ] Notification appears

### Admin Features
- [ ] Login as admin@company.com
- [ ] Can access all pages
- [ ] Can access Users page
- [ ] User table displays correctly
- [ ] Can see all users
- [ ] Role badges display correctly
- [ ] Can see all leave requests in Approvals

### Protected Routes
- [ ] Logout and try to access /dashboard
  - Should redirect to /login
- [ ] Login as employee and try to access /approvals
  - Should redirect to /dashboard
- [ ] Login as employee and try to access /users
  - Should redirect to /dashboard
- [ ] Login as manager and try to access /users
  - Should redirect to /dashboard

## ✅ UI/UX Verification

### Design
- [ ] Dark theme applied correctly
- [ ] Colors match design system
- [ ] Glass effects visible
- [ ] Borders subtle and consistent
- [ ] Text readable and high contrast

### Animations
- [ ] Page transitions smooth
- [ ] Stats circles animate on load
- [ ] Modal slides in smoothly
- [ ] Form steps transition smoothly
- [ ] Buttons have hover effects
- [ ] No janky animations

### Responsiveness
- [ ] Test on mobile viewport (< 640px)
- [ ] Test on tablet viewport (640px - 1024px)
- [ ] Test on desktop viewport (> 1024px)
- [ ] Navigation adapts to screen size
- [ ] Forms usable on mobile
- [ ] Tables scroll horizontally on mobile

### Notifications
- [ ] Success toasts appear (green)
- [ ] Error toasts appear (red)
- [ ] Toasts auto-dismiss after 3 seconds
- [ ] Toasts match dark theme
- [ ] Multiple toasts stack correctly

## ✅ Error Handling

### Frontend Errors
- [ ] Invalid login shows error message
- [ ] Network errors show toast notification
- [ ] Loading states display correctly
- [ ] Empty states display correctly

### Backend Errors
- [ ] Invalid credentials return 401
- [ ] Unauthorized access returns 403
- [ ] Missing token returns 401
- [ ] Validation errors return 400
- [ ] Server errors return 500

## ✅ Data Validation

### Leave Request
- [ ] Cannot submit without leave type
- [ ] Cannot submit without dates
- [ ] Cannot submit with end date before start date
- [ ] Cannot submit without reason
- [ ] Cannot submit if insufficient leave balance

### User Registration
- [ ] Cannot submit without name
- [ ] Cannot submit without email
- [ ] Cannot submit with invalid email format
- [ ] Cannot submit without password
- [ ] Cannot submit with password < 6 characters
- [ ] Cannot submit without department

## ✅ Performance

### Load Times
- [ ] Initial page load < 3 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] API responses < 1 second
- [ ] Animations run at 60fps

### Network
- [ ] Check Network tab in DevTools
- [ ] API calls return 200 status
- [ ] No failed requests
- [ ] Reasonable payload sizes

## ✅ Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

## ✅ Console Checks

### Frontend Console
- [ ] No error messages
- [ ] No warning messages (or acceptable warnings)
- [ ] No 404 errors
- [ ] No CORS errors

### Backend Console
- [ ] MongoDB connected message appears
- [ ] Server running message appears
- [ ] No error messages
- [ ] API requests logged (optional)

## ✅ Code Quality

### Backend
- [ ] No syntax errors
- [ ] Proper error handling
- [ ] Environment variables used
- [ ] No hardcoded secrets
- [ ] Consistent code style

### Frontend
- [ ] No syntax errors
- [ ] No unused imports
- [ ] Proper component structure
- [ ] Consistent code style
- [ ] No console.log statements (or minimal)

## ✅ Documentation

- [ ] README.md complete
- [ ] QUICKSTART.md available
- [ ] PROJECT_STRUCTURE.md available
- [ ] FEATURES.md available
- [ ] DEPLOYMENT.md available
- [ ] All setup steps documented
- [ ] Default credentials documented

## ✅ Git (Optional)

- [ ] Repository initialized (`git init`)
- [ ] .gitignore configured
- [ ] Initial commit made
- [ ] Remote repository added (GitHub/GitLab)
- [ ] Code pushed to remote

## 🎉 Final Verification

### Complete User Flow
1. [ ] Register new user
2. [ ] Login with new user
3. [ ] Request leave
4. [ ] Logout
5. [ ] Login as manager
6. [ ] Approve the leave
7. [ ] Verify leave balance updated
8. [ ] Logout
9. [ ] Login as admin
10. [ ] View all users
11. [ ] View all leaves

### Success Criteria
- [ ] All features working
- [ ] No errors in console
- [ ] UI looks professional
- [ ] Animations smooth
- [ ] Data persists correctly
- [ ] Authentication secure
- [ ] Roles enforced properly

## 🐛 Common Issues & Solutions

### MongoDB Connection Failed
```
Solution:
1. Check if MongoDB is running
2. Verify MONGODB_URI in .env
3. Check MongoDB logs
4. For Atlas: Verify IP whitelist
```

### Port Already in Use
```
Solution:
1. Change PORT in backend/.env
2. Kill process using port: lsof -ti:8000 | xargs kill -9
3. Restart backend server
```

### CORS Error
```
Solution:
1. Verify backend is running on port 8000
2. Check CORS configuration in server.js
3. Verify API_URL in frontend/src/utils/api.js
```

### JWT Token Invalid
```
Solution:
1. Clear localStorage in browser
2. Logout and login again
3. Verify JWT_SECRET is set in .env
4. Check token expiration
```

### Dependencies Installation Failed
```
Solution:
1. Delete node_modules folder
2. Delete package-lock.json
3. Run npm install again
4. Check Node.js version compatibility
```

## 📞 Need Help?

If you encounter issues not covered here:

1. Check error messages carefully
2. Review console logs (frontend & backend)
3. Verify all environment variables
4. Ensure all dependencies installed
5. Check MongoDB connection
6. Review documentation files

## ✨ You're All Set!

If all items are checked, your Employee Leave Management System is ready to use!

**Next Steps:**
- Explore all features
- Customize the design
- Add new features
- Deploy to production
- Share with your team

Happy coding! 🚀
