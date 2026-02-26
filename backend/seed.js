require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Leave = require('./models/Leave');
const connectDB = require('./config/db');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Leave.deleteMany({});

    // Create Admins
    const admin1 = await User.create({
      name: 'Admin User',
      email: 'admin@company.com',
      password: 'admin123',
      role: 'admin',
      department: 'Management',
      leaveBalance: 25
    });

    const admin2 = await User.create({
      name: 'Sarah Admin',
      email: 'admin2@company.com',
      password: 'admin123',
      role: 'admin',
      department: 'Management',
      leaveBalance: 25
    });

    // Create Managers
    const manager1 = await User.create({
      name: 'Manager John',
      email: 'manager@company.com',
      password: 'manager123',
      role: 'manager',
      department: 'Engineering',
      leaveBalance: 20
    });

    const manager2 = await User.create({
      name: 'Manager Sarah',
      email: 'manager2@company.com',
      password: 'manager123',
      role: 'manager',
      department: 'Design',
      leaveBalance: 18
    });

    const manager3 = await User.create({
      name: 'Manager David',
      email: 'manager3@company.com',
      password: 'manager123',
      role: 'manager',
      department: 'Marketing',
      leaveBalance: 22
    });

    // Create Employees
    const employees = [];
    const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tina'];
    
    for (let i = 1; i <= 20; i++) {
      const firstName = firstNames[i - 1];
      const employee = await User.create({
        name: `${firstName} Employee`,
        email: `employee${i}@company.com`,
        password: 'employee123',
        role: 'employee',
        department: departments[i % departments.length],
        managerId: i % 3 === 0 ? manager1._id : i % 3 === 1 ? manager2._id : manager3._id,
        leaveBalance: Math.floor(Math.random() * 10) + 10 // 10-20 days
      });
      employees.push(employee);
    }

    console.log('✅ Users created successfully!');

    // Create Leave Requests
    const leaveTypes = ['sick', 'casual', 'annual', 'unpaid'];
    const statuses = ['pending', 'approved', 'rejected'];
    const leaves = [];
    const allUsers = [admin1, admin2, manager1, manager2, manager3, ...employees];

    // Create various leave requests for employees and managers
    for (let i = 0; i < 45; i++) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Random dates in the past 60 days or future 30 days
      const daysOffset = Math.floor(Math.random() * 90) - 60;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + daysOffset);
      
      const duration = Math.floor(Math.random() * 5) + 1; // 1-5 days
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration - 1);

      // Determine reviewer based on user role
      let reviewer = null;
      if (status !== 'pending') {
        if (user.role === 'admin') {
          // Admin leaves reviewed by other admin
          reviewer = user._id.equals(admin1._id) ? admin2._id : admin1._id;
        } else if (user.role === 'manager') {
          // Manager leaves reviewed by admin
          reviewer = Math.random() > 0.5 ? admin1._id : admin2._id;
        } else {
          // Employee leaves reviewed by manager or admin
          reviewer = Math.random() > 0.3 ? (Math.random() > 0.5 ? manager1._id : manager2._id) : admin1._id;
        }
      }

      const leave = await Leave.create({
        employeeId: user._id,
        leaveType,
        startDate,
        endDate,
        reason: `${leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} leave request for personal matters.`,
        status,
        totalDays: duration,
        reviewedBy: reviewer,
        reviewedAt: status !== 'pending' ? new Date() : null,
        reviewComment: status === 'rejected' ? 'Unable to approve due to team capacity.' : status === 'approved' ? 'Approved. Enjoy your time off!' : ''
      });
      leaves.push(leave);
    }

    console.log('✅ Leave requests created successfully!');
    console.log(`\n📊 Database seeded with:`);
    console.log(`   - 2 Admins`);
    console.log(`   - 3 Managers`);
    console.log(`   - 20 Employees`);
    console.log(`   - 45 Leave Requests`);
    
    console.log('\n🔑 Default Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin 1:');
    console.log('  Email: admin@company.com');
    console.log('  Password: admin123');
    console.log('\nAdmin 2:');
    console.log('  Email: admin2@company.com');
    console.log('  Password: admin123');
    console.log('\nManager 1:');
    console.log('  Email: manager@company.com');
    console.log('  Password: manager123');
    console.log('\nManager 2:');
    console.log('  Email: manager2@company.com');
    console.log('  Password: manager123');
    console.log('\nManager 3:');
    console.log('  Email: manager3@company.com');
    console.log('  Password: manager123');
    console.log('\nEmployees:');
    console.log('  Email: employee1@company.com to employee20@company.com');
    console.log('  Password: employee123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
