const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SongSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: String
});

// Create Model
const Song = mongoose.model('Songs', SongSchema);

module.exports = Song;