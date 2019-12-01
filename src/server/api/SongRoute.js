const express = require('express');
const router = express.Router();

// User model
const Song = require('../models/Song');

// '/api/songs' - GET - Get All Songs
router.get('/', (req, res) => {
    Song.find()
    .then(items => res.json(items));
});

// '/api/songs/:songId' - GET - Get Song from ID
router.get('/:songId', (req, res) => {
    let songId = req.params.songId;
    console.log("Incoming Request: Song query for song " + songId);
    Song.findOne({_id: songId})
    .then(items => res.json(items));
});

// '/api/songs' - POST - Create A New Song
router.post('/', (req, res) => {
    const newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        track: req.body.track,
        genre: req.body.genre
    });

    newSong.save().then(item => res.json(item));
});

module.exports = router;