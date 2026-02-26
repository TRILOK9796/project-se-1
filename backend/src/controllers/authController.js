const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Consumer = require('../models/Consumer');
const DeliveryPartner = require('../models/DeliveryPartner');

// Generate JWT Token
const generateToken = (id, userType) => {
  return jwt.sign({ id, user_type: userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, phone, password, name, user_type } = req.body;

    // Validation
    if (!email || !phone || !password || !name || !user_type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone already registered'
      });
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      phone,
      password_hash: password,
      name,
      user_type
    });

    // Create role-specific profile
    if (user_type === 'farmer') {
      await Farmer.create({
        user_id: user._id,
        farm_name: name
      });
    } else if (user_type === 'consumer') {
      await Consumer.create({
        user_id: user._id
      });
    } else if (user_type === 'delivery_partner') {
      await DeliveryPartner.create({
        user_id: user._id
      });
    }

    // Generate token
    const token = generateToken(user._id, user_type);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        user_type: user.user_type
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password_hash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.user_type);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        user_type: user.user_type
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        user_type: user.user_type,
        profile_pic: user.profile_pic,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  generateToken
};
