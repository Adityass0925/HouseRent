const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    enum: ['user', 'owner', 'admin'], 
    default: 'user' 
  },
  profileImage: { type: String, default: '' },
  currentLocation: { type: String, default: '' },
  // Adding this because Admin needs to approve Owners to post properties
  isApprovedOwner: { type: Boolean, default: false } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);