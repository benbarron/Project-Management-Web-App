const mongoose = require('mongoose');

// Create User Schema
const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: false
  },
  dueDateInstance: {
    type: Date,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: true
  },
  parentCard: {
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

module.exports = Todo = mongoose.model('todos', TodoSchema);
