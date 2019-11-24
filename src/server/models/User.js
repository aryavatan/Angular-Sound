const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    email: String,
    password: String
});

// Create Model
const User = mongoose.model('Users', UserSchema);

module.exports = User;