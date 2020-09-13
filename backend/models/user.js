const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

//create model for todo
const User = mongoose.model('user', UserSchema);

module.exports = User;
