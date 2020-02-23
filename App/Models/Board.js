const mongoose = require('mongoose');

// Create User Schema
const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'personal'
  },
  description: {
    type: String,
    required: false
  },
  bg: {
    type: Object,
    required: false,
    default: {}
  },
  sortValue: {
    type: Number,
    required: true
  },
  unix: {
    type: Number,
    required: true
  },
  members: {
    type: Array,
    required: true
  }
});

module.exports = Board = mongoose.model('boards', BoardSchema);
