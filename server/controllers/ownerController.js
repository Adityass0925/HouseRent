const Property = require('../models/PropertySchema');

// @desc    Add a new property
// @route   POST /api/owner/properties
const addProperty = async (req, res) => {
  try {
    // 1. Check if Admin has approved this owner
    if (!req.user.isApprovedOwner) {
      return res.status(403).json({ message: 'Your account must be approved by an admin to post properties.' });
    }

    const { title, description, location, rentAmount, propertyType, furnishingStatus, amenities } = req.body;
    
    // 2. Get uploaded image paths from multer
    const images = req.files ? req.files.map(file => file.path) : [];

    // 3. Handle amenities (convert comma-separated string to array)
    let parsedAmenities = amenities;
    if (typeof amenities === 'string') {
       parsedAmenities = amenities.split(',').map(item => item.trim());
    }

    // 4. Create property
    const property = new Property({
      owner: req.user._id,
      title, description, location, rentAmount, propertyType, furnishingStatus,
      amenities: parsedAmenities,
      images
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged-in owner's properties
// @route   GET /api/owner/properties
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addProperty, getMyProperties };