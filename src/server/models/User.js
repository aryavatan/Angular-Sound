const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const UserSchema = new Schema({
    email: String,
    password: String
});
const User = mongoose.model('Users', UserSchema);

module.exports = User;