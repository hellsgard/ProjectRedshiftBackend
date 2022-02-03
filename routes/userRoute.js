const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const passport = require('passport');
const bcrypt = require('bcrypt');



// import in the model - will need to use models for the passport validation
const {User} = require('../models/users.js');

router.post('/login', passport.authenticate('local'),  async (req, res, next) => {
    console.log(req);  
    // res.status(200);
    res.redirect(200, '/home');    // this should redirect to home but doesnt!! why?!?            
    // res.send('Hello, you are now authenticated'); // this sends hello when authentication works! - so you can check in postman 
})

// app.post(
//     '/login',
//     passport.authenticate('local', {
//       successRedirect: '/testGuard',
//       failureRedirect: '/testGuard',
//     })
//   );

router.get('/logout', function (req, res){ // for logging out // doesn't currently work
    req.logout(function (err) {
      res.redirect('/'); 
      console.log('on logout page');
    });
  });




module.exports = router;