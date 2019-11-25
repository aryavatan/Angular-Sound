const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true  
    },
    password: String,
    status: {
        type: String,
        default: ''
    }
});

UserSchema.plugin(uniqueValidator);

// Create Model
const User = mongoose.model('Users', UserSchema);

module.exports = User;