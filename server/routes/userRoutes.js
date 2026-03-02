const express = require('express');
const router = express.Router();

// We import ALL the controller functions here in one single line to avoid the duplicate error
const { registerUser, loginUser, getProperties, bookProperty } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/user/register
router.post('/register', registerUser);

// @route   POST /api/user/login
router.post('/login', loginUser);

// @route   GET /api/user/properties
router.get('/properties', getProperties); 

// @route   POST /api/user/book
router.post('/book', protect, bookProperty); 

module.exports = router;