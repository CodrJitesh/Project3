# Project Structure

## 📁 Complete Directory Layout

```
employee-leave-management/
│
├── backend/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic (login, register)
│   │   ├── leaveController.js       # Leave CRUD operations
│   │   └── userController.js        # User management
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT verification & role authorization
│   │
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, role, etc.)
│   │   └── Leave.js                 # Leave schema (dates, status, etc.)
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth/* endpoints
│   │   ├── leaveRoutes.js           # /api/leaves/* endpoints
│   │   └── userRoutes.js            # /api/users/* endpoints
│   │
│   ├── .env.example                 # Environment variables template
│   ├── package.json                 # Backend dependencies
│   ├── seed.js                      # Database seeding script
│   └── server.js                    # Express app entry point
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js            # Navigation bar component
│   │   │   ├── ProtectedRoute.js    # Route protection wrapper
│   │   │   ├── StatsCircles.js      # Unique circular stats visualization
│   │   │   └── LeaveFormModal.js    # Multi-step leave form
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js       # Global auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Registration page
│   │   │   ├── Dashboard.js         # Main dashboard (all roles)
│   │   │   ├── Approvals.js         # Leave approval page (Manager/Admin)
│   │   │   └── Users.js             # User management page (Admin)
│   │   │
│   │   ├── utils/
│   │   │   └── api.js               # Axios configuration & API calls
│   │   │
│   │   ├── App.js                   # Main app component with routing
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles + Tailwind
│   │
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── .gitignore                        # Git ignore rules
├── README.md                         # Main documentation
├── QUICKSTART.md                     # Quick start guide
└── PROJECT_STRUCTURE.md              # This file
```

## 🔑 Key Files Explained

### Backend

#### `server.js`
- Express app initialization
- Middleware setup (CORS, JSON parsing)
- Route mounting
- Server startup

#### `config/db.js`
- MongoDB connection using Mongoose
- Error handling for database connection

#### `models/User.js`
- User schema definition
- Password hashing with bcrypt
- Password comparison method
- Fields: name, email, password, role, department, leaveBalance

#### `models/Leave.js`
- Leave request schema
- Fields: employeeId, leaveType, dates, status, reason
- References User model

#### `middleware/auth.js`
- `protect`: Verifies JWT token
- `authorize`: Checks user role permissions

#### `controllers/authController.js`
- `register`: Create new user account
- `login`: Authenticate user and return JWT
- `getMe`: Get current user profile

#### `controllers/leaveController.js`
- `createLeave`: Submit leave request
- `getMyLeaves`: Get user's leave history
- `getAllLeaves`: Get all leaves (Admin)
- `getTeamLeaves`: Get team leaves (Manager)
- `updateLeaveStatus`: Approve/reject leave
- `getLeaveStats`: Get statistics

#### `controllers/userController.js`
- `getAllUsers`: List all users
- `updateUser`: Update user details
- `deleteUser`: Deactivate user

### Frontend

#### `App.js`
- React Router setup
- Route definitions
- Protected route wrappers
- Toast notification configuration

#### `context/AuthContext.js`
- Global authentication state
- Login/logout functions
- User data management
- Token handling

#### `components/ProtectedRoute.js`
- Route protection based on authentication
- Role-based access control
- Loading state handling

#### `components/StatsCircles.js`
- Unique circular statistics visualization
- Connected circles with SVG lines
- Animated appearance with Framer Motion

#### `components/LeaveFormModal.js`
- Multi-step form (Type → Dates → Details)
- Progress indicator
- Smooth slide animations
- Form validation

#### `components/Navbar.js`
- Navigation menu
- User profile display
- Role-based menu items
- Logout functionality

#### `pages/Dashboard.js`
- Stats visualization
- Leave request button
- Recent leaves list
- Leave balance display

#### `pages/Approvals.js`
- Filter by status tabs
- Leave request cards
- Review modal
- Approve/reject actions

#### `pages/Users.js`
- User table
- Role badges
- Status indicators
- Department information

#### `utils/api.js`
- Axios instance configuration
- API endpoint functions
- JWT token interceptor

## 🎨 Styling Architecture

### Tailwind Configuration
- Custom color palette (dark theme)
- Custom animations
- Extended theme values

### Color Scheme
```javascript
dark: {
  bg: '#0a0e1a',        // Main background
  surface: '#131824',    // Card background
  elevated: '#1a2030',   // Elevated elements
  border: '#252d3f',     // Borders
  text: '#e4e7ec',       // Primary text
  muted: '#8b92a7'       // Secondary text
}

accent: {
  primary: '#6366f1',    // Primary actions
  secondary: '#8b5cf6',  // Secondary actions
  success: '#10b981',    // Success states
  warning: '#f59e0b',    // Warning states
  danger: '#ef4444'      // Danger states
}
```

## 🔐 Authentication Flow

1. User submits login credentials
2. Backend validates and returns JWT
3. Frontend stores token in localStorage
4. Token included in all API requests via interceptor
5. Backend middleware verifies token
6. Protected routes check authentication state

## 📊 Data Flow

### Leave Request Flow
1. Employee fills multi-step form
2. Frontend validates input
3. POST request to `/api/leaves`
4. Backend validates and saves to MongoDB
5. Leave balance checked
6. Response sent to frontend
7. UI updates with new leave request

### Approval Flow
1. Manager views pending leaves
2. Clicks review on a leave
3. Adds optional comment
4. Approves or rejects
5. PATCH request to `/api/leaves/:id/status`
6. Backend updates leave status
7. If approved, deducts from leave balance
8. UI refreshes with updated status

## 🚀 Deployment Considerations

### Backend
- Set NODE_ENV=production
- Use strong JWT_SECRET
- Configure MongoDB Atlas
- Enable CORS for frontend domain
- Add rate limiting
- Implement logging

### Frontend
- Build with `npm run build`
- Serve static files
- Update API_URL for production
- Enable HTTPS
- Configure CDN

## 📝 Environment Variables

### Backend (.env)
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend
Update `API_URL` in `src/utils/api.js` for production

## 🧪 Testing Strategy

### Manual Testing
1. Test each role separately
2. Verify protected routes
3. Test form validations
4. Check error handling
5. Verify animations

### Automated Testing (Future)
- Unit tests for controllers
- Integration tests for API endpoints
- Component tests for React
- E2E tests with Cypress

## 📚 Learning Resources

- **React Router**: https://reactrouter.com
- **Context API**: https://react.dev/reference/react/useContext
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Express.js**: https://expressjs.com
- **Mongoose**: https://mongoosejs.com
- **JWT**: https://jwt.io
