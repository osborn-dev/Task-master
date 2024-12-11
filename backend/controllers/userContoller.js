const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @desc Registers a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please include all fields');
    }
  
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Attempt creating user
    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      console.log('Created user:', user); // Log the created user object
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Error creating user:', error); // Log any errors during user creation
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

// logs in an existing user
// @route /api/users/login
// @access Private
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    // checking for existing user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

// @desc Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    // restructuring the model
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    // userId is gotten from the req.user from the middlware
    res.status(200).json(user)
})
console.log('JWT_SECRET:', process.env.JWT_SECRET);
// JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = {
    registerUser,
     loginUser,
     getMe,
}