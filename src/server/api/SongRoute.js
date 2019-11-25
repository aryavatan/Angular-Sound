const express = require('express');
const router = express.Router();

// User model
const Song = require('../models/Song');

// '/api/songs' - GET - Get All Songs
router.get('/', (req, res) => {
    Song.find()
    .then(items => res.json(items));
});

// '/api/songs' - POST - Create A New Song
router.post('/', (req, res) => {
    const newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year
    });

    newSong.save().then(item => res.json(item));
});

module.exports = router;