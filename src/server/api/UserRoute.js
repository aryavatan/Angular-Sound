const express = require('express');
const router = express.Router();

// User model
const User = require('../models/User');

// '/api/users' - GET - Get All Users
router.get('/', (req, res) => {
    User.find()
    .then(items => res.json(items));
});

module.exports = router;