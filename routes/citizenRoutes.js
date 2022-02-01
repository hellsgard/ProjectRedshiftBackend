const router = require('express').Router();
const Citizen = require('../models/citizen.js');
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/readAll', async (req, res) => {
    const users = await sequelize.query("SELECT * FROM citizen 0kLIMIT 10", { type: sequelize.QueryTypes.SELECT } ); // this will need changing back to citizen
    console.log(users);
    });


// const findAll = Citizen.findAll()
//   .then(citizens => {
//     console.log("citi: ", citizens)
//   });


// router.get('/getAll'), (req, res) => {
//     console.log(findAll);
// }



// router.get("/getAll"), (req, res) => {
//     console.log("Get all citizens");
//     Citizen.findAll()
//   .then(citizens => {
//     console.log("citi: ", citizens)
//   });
// }






module.exports = router;