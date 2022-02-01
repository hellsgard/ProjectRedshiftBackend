const express = require('express');
const router = express.Router();

// import in the model
const { User } = require('../models/users');


let username;
let password;
let allowLogin = false;
// read all  - then check for matching against the database
router.get('readAll', (req, res) => {
    res.status(202).send(`accessed get all`);
    let user = res;
    console.log(user);
    for (let i = 0; i < user.length; i++) {
        if (username == i.username) {
            console.log('username match');
            if (password == i.password) {
                console.log('password match');
                allowLogin = true; }
            else {
                    console.log('password doesnt match')
                } }
            else {
            console.log('no user with that username')
                }
            }
    });

module.exports = router;