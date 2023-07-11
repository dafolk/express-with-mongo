const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;