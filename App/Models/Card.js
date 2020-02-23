const mongoose = require('mongoose');

// Create User Schema
const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  parentBoard: {
    type: String,
    required: true
  },
  sortValue: {
    type: Number,
    required: true
  },
  unix: {
    type: Number,
    required: true
  }
});

module.exports = Card = mongoose.model('cards', CardSchema);
