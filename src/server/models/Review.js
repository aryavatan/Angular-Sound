const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
    songId: String,
    user: String,
    rating: Number,
    review: String
});

// Create Model
const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;