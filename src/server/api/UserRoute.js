const express = require('express');
const router = express.Router();

// User model
const User = require('../models/User');

// '/api/users' - GET - Get All Users
router.get('/', (req, res) => {
    User.find()
    .then(items => res.json(items));
});

// '/api/users' - POST - Create A New Users
router.post('/', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(item => res.json(item));
});

module.exports = router;