const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: Number,
  nickname: String,
  password: String,
  email: String,
  phone: Number,
});

const User = mongoose.model('User', userSchema);
module.exports = User;