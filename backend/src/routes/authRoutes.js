const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  getUserProfile, 
  resetPassword, 
  updateProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.get('/profile', protect, getUserProfile);
router.put('/reset-password', protect, resetPassword);
router.put('/update-profile', protect, updateProfile);

module.exports = router;
