const express = require('express');
const bcrypt = require('bcrypt');

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
    bcrypt.hash(req.body.password, 10).then(hash => {
        
        const newUser = new User({
            email: req.body.email,
            password: hash,
            status: req.body.status
        });
        
        newUser.save().then(item => res.json(item))
        .catch(err => {
            res.status(500).json({error: err});
        });

    })
    
    

});

module.exports = router;