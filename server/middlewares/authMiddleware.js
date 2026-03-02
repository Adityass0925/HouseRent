const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// 1. Protect Route: Checks if the user is logged in
const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database (exclude the password) and attach to req
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Move to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. Role Authorization: Checks if the user has the right permissions
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({ 
        message: `Role (${req.user.userType}) is not allowed to access this resource` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };