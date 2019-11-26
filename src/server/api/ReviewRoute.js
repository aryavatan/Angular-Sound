const express = require('express');
const router = express.Router();

// Review model
const Review = require('../models/Review');

//=========================================
// Routes

// '/api/reviews' - GET - Get All Reviews
router.get('/', (req, res) => {
    Review.find()
    .then(items => res.json(items));
});

// '/api/reviews/:songId' - GET - Get All Reviews For A Song
router.get('/:songId', (req, res) => {
    let songId = req.params.songId;
    console.log("Incoming Request: Review query for song " + songId);
    Review.find({songId: songId})
    .then(items => res.json(items));
});

// '/api/reviews' - POST - Create A New Review
router.post('/', (req, res) => {
    const newReview = new Review({
        songId: req.body.songId,
        user: req.body.user,
        rating: req.body.rating,
        review: req.body.review
    });

    newReview.save().then(item => res.json(item));
});






//=========================================
module.exports = router;