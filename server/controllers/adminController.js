const User = require('../models/UserSchema');

// @desc    View all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Approve an owner account
// @route   PUT /api/admin/approve-owner/:id
const approveOwner = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (user && user.userType === 'owner') {
      user.isApprovedOwner = true;
      await user.save();
      res.json({ message: 'Owner approved successfully', user });
    } else {
      res.status(404).json({ message: 'Owner not found or invalid user type' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, approveOwner };