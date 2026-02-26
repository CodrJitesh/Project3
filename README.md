# Employee Leave Management System

A modern, full-stack leave management application with role-based access control and a unique dark-mode UI.

## Tech Stack

- **Frontend**: React.js + Tailwind CSS + React Router
- **State Management**: Context API
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Features

- JWT-based authentication
- Role-based dashboards (Admin, Manager, Employee)
- Multi-step leave application form
- Leave approval workflow
- Real-time status tracking
- Protected routes
- Responsive dark-mode design

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and configure your MongoDB URI and JWT secret
npm run seed    # Seed database with default users
npm run dev     # Start development server
```

### Frontend Setup
```bash
cd frontend
npm install
npm start       # Starts on http://localhost:3000
```

## Default Credentials

After running `npm run seed` in the backend:

**Admin Account:**
- Email: admin@company.com
- Password: admin123

**Manager Account:**
- Email: manager@company.com
- Password: manager123

**Employee Account:**
- Email: employee@company.com
- Password: employee123

## Project Structure
```
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    └── package.json
```


## Features Implemented

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Protected routes on frontend and backend
- Secure password hashing with bcrypt

### Leave Management
- Multi-step leave application form with smooth animations
- Leave type selection (Sick, Casual, Annual, Unpaid)
- Date range selection with validation
- Automatic leave balance calculation
- Leave status tracking (Pending, Approved, Rejected)

### Dashboard Features
- Unique circular stats visualization with connecting lines
- Real-time leave balance display
- Recent leave requests overview
- Role-specific dashboards

### Approval Workflow
- Manager/Admin approval interface
- Filter by status (Pending, Approved, Rejected)
- Add review comments
- Approve/Reject functionality
- Team leave overview for managers

### User Management (Admin Only)
- View all users
- User role and status display
- Department organization

### UI/UX Features
- Dark-mode first design
- Smooth animations with Framer Motion
- Glass-morphism effects
- Toast notifications
- Responsive design
- Loading states
- Error handling

## Design Philosophy

This application features a unique dark-mode UI that breaks away from generic card-based layouts:

- **Color Theory**: Carefully selected color palette with accent colors for different states
- **Circular Stats**: Connected circles showing leave statistics instead of traditional cards
- **Multi-step Form**: Sliding form with progress indicator for better UX
- **Subtle Animations**: Smooth transitions without overwhelming the user
- **Glass Effects**: Modern glass-morphism for depth and hierarchy

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Leaves
- `POST /api/leaves` - Create leave request
- `GET /api/leaves/my-leaves` - Get user's leaves
- `GET /api/leaves/stats` - Get leave statistics
- `GET /api/leaves/all` - Get all leaves (Admin)
- `GET /api/leaves/team` - Get team leaves (Manager)
- `PATCH /api/leaves/:id/status` - Update leave status

### Users
- `GET /api/users` - Get all users (Admin/Manager)
- `PATCH /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Deactivate user (Admin)

## Technologies Used

### Frontend
- React 18
- React Router v6
- Context API for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Future Enhancements

- Email notifications for leave status updates
- Calendar view for leave visualization
- Leave history and analytics
- Export leave reports
- Mobile app version
- Multi-language support
- Leave carry-forward functionality
- Holiday calendar integration

## 📖 Documentation

This project includes comprehensive documentation:

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed file structure and architecture
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Verification checklist
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[SUMMARY.md](SUMMARY.md)** - Project overview and achievements

## 🎓 Learning Resources

This project is perfect for learning:
- Full-stack development with MERN stack
- JWT authentication and authorization
- React Context API for state management
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- RESTful API design
- MongoDB database modeling

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real-world HR systems
- Designed for learning and production use

## 📧 Support

Having issues? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or create an issue.

---

**Made with ❤️ for learning and building amazing things!**
