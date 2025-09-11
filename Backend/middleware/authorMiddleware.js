const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const asyncHandler = require('express-async-handler');

// Protect routes - verify JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check for token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized - user not found'
        });
      }
      
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized - invalid token'
      });
    }
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - no token provided'
    });
  }
});

// Check for specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Optional authentication - for routes that work both with and without auth
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token is invalid, but we'll continue without user
      req.user = null;
    }
  }
  
  next();
});

module.exports = {
  protect,
  authorize,
  optionalAuth
};
