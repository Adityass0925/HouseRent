const express = require('express');
const router = express.Router();
const { addProperty, getMyProperties } = require('../controllers/ownerController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Secure routes: Must be logged in and be an owner
router.use(protect, authorize('owner'));

// Use multer upload middleware to accept up to 5 images
router.post('/properties', upload.array('images', 5), addProperty);
router.get('/properties', getMyProperties);

module.exports = router;