const express = require('express');
const router = express.Router();
const CheckAuthentication = require('../authentication/Check-Authentication');

// User model
const User = require('../models/User');

// '/api/admin' - PUT - Used to update a users status to admin
router.put("/", CheckAuthentication, (req, res) => {
    let filter = {email: req.body.email};
    let update = {status: 'admin'};

    User.findOneAndUpdate(filter, update, function(err){
        if(err){
            return res.send(err);
        }
        console.log(req.body.email + " now has admin status");
        res.status(200).json({message: req.body.email + " now has admin status"})
    });
});

module.exports = router;