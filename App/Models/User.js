const mongoose = require('mongoose');

// Create User Schema
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: false
  },
  lastSignIn: {
    type: Date,
    default: null,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  passwordResetToken: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model('users', UserSchema);
