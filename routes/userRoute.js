const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logout = require('express-passport-logout');



// import in the model - will need to use models for the passport validation
const {User} = require('../models/users.js');

router.post('/login', passport.authenticate('local'),  async (req, res, next) => {
    console.log(req);  
    // const token = jwt.sign(req.user.toJSON(), 'marmoset', {expiresIn: '30m'});
    // console.log(token); // this is the token
    // console.log("I AM HERE!!!!")
    
    // if (typeof window !== 'undefined') {
    // localStorage.setItem("isAuthenticated", "true");
    // window.location.pathname = "/";
    // }
    // res.cookie('rememberme', 'yes', { expires: new Date(Date.now() + 900000), httpOnly: true }); // hopefully this is the cookies for remembering // 15 mins
    // res.status(200);
    // res.send({token}).redirect(200, '/home');
    res.redirect(200, '/home');           
    
})

router.delete('/logout', async (req, res, next) => {
  logout();
  console.log('going to logout page');
  res.redirect(200, 'http://localhost:8080/login');
});

router.get('/logout', function (req, res){ // for logging out // doesn't currently work
    req.logout(function (err) {
      res.redirect('/'); 
      console.log('on logout page');
    });
  });

  router.post('/register', async (req, res) => {
    console.log(" DO I GET PRINTED??")
    const saltRounds = 10;
    const passwordReg = req.body.password; // these are undefined?
    const usernameReg = req.body.username;
    console.log("HERE !!!!!")
    console.log(req.body.password); // coming back as undefined? 
    console.log(req.body.username);
    console.log(" THEN HERE !!!!!")
    const hashedPassword = await bcrypt.hash(passwordReg, saltRounds);
    console.log(" AFTER HASH")
    await sequelize.query(`INSERT INTO users (username, password)
     VALUES (?,?)`, {replacements: [usernameReg, hashedPassword],
         type: QueryTypes.INSERT});
        res.status(200).send('user registered');
     });


module.exports = router;