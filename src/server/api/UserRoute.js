const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
    // Validate email
    if(!validateEmail(req.body.email)){
        return res.status(400).json({message: "Invalid Email"});
    }

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

// '/api/users/login' - POST - Login User
router.post('/login', (req, res) => {
    let fetchedUser;

    // Validate email
    if(!validateEmail(req.body.email)){
        return res.status(400).json({message: "Invalid Email"});
    }

    // Check for email address in db
    User.findOne({email: req.body.email})
    .then(user => {
        console.log("Login Request for: " + user);

        // If user not found, return 401
        if(!user){
            return res.status(401).json({
                message: 'User Authentication Failed'
            });
        }

        // Check if user is deactivated
        if(user.status == 'deactivated'){
            return res.json({error: "deactivated"});
        }

        fetchedUser = user;

        // Else user exists, check password
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        console.log("Password Check Result: " + result);
        if(result == false){
            return res.status(401).json({
                message: 'User Authentication Failed'
            });
        }

        const token = jwt.sign(
            {email: fetchedUser.email, userId: fetchedUser._id},
            "secret_string_that_should_be_a_lot_longer",
            { expiresIn: "1h"}
        );

        res.status(200).json({
            token: token
        });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

function validateEmail(email) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    // If email does not contain illegal characters, it is valid therefore return true
    // Else it is invalid and return false
    if(email.includes('*')){
        return false;
    }
    else if (regExp.test(email)) {
        return true; // Return as valid email
    } 

    return false;
}

module.exports = router;