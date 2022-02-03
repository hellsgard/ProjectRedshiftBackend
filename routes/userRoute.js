const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const passport = require('passport');



// import in the model - will need to use models for the passport validation
const {User} = require('../models/users.js');

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    console.log(req);
    res.send('hello'); // this sends hello when authentication works! - so you can check in postman
    
})





module.exports = router;