const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
} = require('../Controllers/authController');
const { protect } = require('../middleware/authorMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);  // POST /api/auth/register
router.post('/login', login);           // POST /api/auth/login

// Protected routes
router.use(protect); // All routes below require authentication

router.get('/profile', getProfile);           // GET /api/auth/profile
router.put('/profile', updateProfile);       // PUT /api/auth/profile
router.put('/change-password', changePassword); // PUT /api/auth/change-password
router.post('/logout', logout);              // POST /api/auth/logout

module.exports = router;