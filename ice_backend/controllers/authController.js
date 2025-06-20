const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save new admin
    const admin = new Admin({ email, password: hashedPassword, name });
    await admin.save();
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    // Log detailed error
    console.error('Registration error:', {
      message: err.message,
      stack: err.stack,
      email: email
    });
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check MongoDB connection
    if (require('mongoose').connection.readyState !== 1) {
      throw new Error('MongoDB connection not established');
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials: Email not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials: Incorrect password' });
    }

    // Verify JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response
    res.json({ 
      token, 
      admin: { id: admin._id, email, name: admin.name },
      message: 'Login successful'
    });
  } catch (err) {
    // Log detailed error
    console.error('Login error:', {
      message: err.message,
      stack: err.stack,
      email: email
    });
    res.status(500).json({ 
      message: 'Server error during login', 
      error: err.message 
    });
  }
};