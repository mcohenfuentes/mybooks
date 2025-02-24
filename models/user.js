const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['loved', 'disliked', 'neutral', 'confused'],
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
