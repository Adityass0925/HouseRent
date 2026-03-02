const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/user/register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, userType } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      userType: userType || 'user' // Defaults to standard user if not specified
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/user/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 2. Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Generate the JWT token
    // Note: It uses process.env.JWT_SECRET, which we need to add to our .env file!
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // 4. Send back the token and user data
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isApprovedOwner: user.isApprovedOwner
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};

const Property = require('../models/PropertySchema');
const Booking = require('../models/BookingSchema');

// @desc    Browse available properties
// @route   GET /api/user/properties
const getProperties = async (req, res) => {
  try {
    // Fetch properties and populate the owner's details
    const properties = await Property.find({ status: 'Available' }).populate('owner', 'name email phone');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Book a property
// @route   POST /api/user/book
const bookProperty = async (req, res) => {
  try {
    const { propertyId, startDate, endDate } = req.body;
    
    const booking = new Booking({
      property: propertyId,
      user: req.user._id,
      startDate,
      endDate
    });
    
    await booking.save();
    res.status(201).json({ message: 'Booking request sent to owner', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update your module.exports at the very bottom to include the new functions!
module.exports = { registerUser, loginUser, getProperties, bookProperty };