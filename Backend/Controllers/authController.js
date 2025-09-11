const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

// @desc    Register new user (Author)
// @route   POST /api/auth/register
// @access  Public (but should be restricted in production)
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }]
  });
  
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or username already exists'
    });
  }
  
  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role: 'author'
  });
  
  if (user) {
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid user data'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or username
  
  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email/username and password'
    });
  }
  
  // Find user by email or username
  const user = await User.findByEmailOrUsername(identifier);
  
  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  // Update last login
  await user.updateLastLogin();
  
  const token = generateToken(user._id);
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      token
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const { username, email } = req.body;
  
  // Check if new username/email already exists (excluding current user)
  if (username !== user.username || email !== user.email) {
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: user._id } },
        { $or: [{ email }, { username }] }
      ]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
  }
  
  user.username = username || user.username;
  user.email = email || user.email;
  
  const updatedUser = await user.save();
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role
    }
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Please provide current and new password'
    });
  }
  
  const user = await User.findById(req.user.id).select('+password');
  
  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }
  
  user.password = newPassword;
  await user.save();
  
  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
};