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
    const { email, phone, password, name, user_type, vehicle_type, vehicle_number, license_number } = req.body;

    // Validation
    if (!email || !phone || !password || !name || !user_type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate delivery partner fields
    if (user_type === 'delivery_partner') {
      if (!vehicle_type || !vehicle_number || !license_number) {
        return res.status(400).json({
          success: false,
          message: 'Please provide vehicle type, vehicle number, and license number'
        });
      }
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
        user_id: user._id,
        vehicle_type,
        vehicle_number,
        license_number
      });
    }

    // Generate token
    const token = generateToken(user._id, user_type);

    // Get role-specific profile ID
    let profileData = {
      id: user._id,
      email: user.email,
      name: user.name,
      user_type: user.user_type
    };

    if (user_type === 'farmer') {
      const farmer = await Farmer.findOne({ user_id: user._id });
      if (farmer) {
        profileData.farmerId = farmer._id;
      }
    } else if (user_type === 'consumer') {
      const consumer = await Consumer.findOne({ user_id: user._id });
      if (consumer) {
        profileData.consumerId = consumer._id;
      }
    } else if (user_type === 'delivery_partner') {
      const deliveryPartner = await DeliveryPartner.findOne({ user_id: user._id });
      if (deliveryPartner) {
        profileData.deliveryPartnerId = deliveryPartner._id;
      }
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: profileData
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

    // Get role-specific profile ID
    let profileData = {
      id: user._id,
      email: user.email,
      name: user.name,
      user_type: user.user_type
    };

    if (user.user_type === 'farmer') {
      const farmer = await Farmer.findOne({ user_id: user._id });
      if (farmer) {
        profileData.farmerId = farmer._id;
      }
    } else if (user.user_type === 'consumer') {
      const consumer = await Consumer.findOne({ user_id: user._id });
      if (consumer) {
        profileData.consumerId = consumer._id;
      }
    } else if (user.user_type === 'delivery_partner') {
      const deliveryPartner = await DeliveryPartner.findOne({ user_id: user._id });
      if (deliveryPartner) {
        profileData.deliveryPartnerId = deliveryPartner._id;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: profileData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Current User Basic Info
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
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        user_type: user.user_type,
        profile_pic: user.profile_pic,
        is_active: user.is_active,
        created_at: user.created_at
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Current User with Profile Details
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let profileDetails = {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      user_type: user.user_type,
      profile_pic: user.profile_pic,
      is_verified: user.is_verified,
      created_at: user.created_at,
      last_login: user.last_login
    };

    // Get role-specific details
    if (user.user_type === 'farmer') {
      const farmer = await Farmer.findOne({ user_id: user._id }).select('-__v');
      if (farmer) {
        profileDetails.farmerDetails = farmer;
      }
    } else if (user.user_type === 'consumer') {
      const consumer = await Consumer.findOne({ user_id: user._id }).select('-__v');
      if (consumer) {
        profileDetails.consumerDetails = consumer;
      }
    } else if (user.user_type === 'delivery_partner') {
      const deliveryPartner = await DeliveryPartner.findOne({ user_id: user._id }).select('-__v');
      if (deliveryPartner) {
        profileDetails.deliveryPartnerDetails = deliveryPartner;
      }
    }

    res.status(200).json({
      success: true,
      data: profileDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current password and new password'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password_hash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password_hash = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, profile_pic } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user details
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profile_pic) user.profile_pic = profile_pic;
    user.updated_at = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
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
  getUserProfile,
  resetPassword,
  updateProfile,
  generateToken
};
