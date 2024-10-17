const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }, // Reference to the blog post
  text: { type: String, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);