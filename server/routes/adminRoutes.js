const express = require('express');
const router = express.Router();
const { getAllUsers, approveOwner } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Secure all admin routes: User must be logged in AND be an admin
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/approve-owner/:id', approveOwner);

module.exports = router;