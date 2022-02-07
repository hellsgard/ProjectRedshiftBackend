// const router = require('express').Router();
// const Citizen = require('../models/citizen.js'); // wont need models
// const { QueryTypes } = require('sequelize');
// const sequelize = require('../utils/database.js');

// // router.get('/readAll', async (req, res) => {
// //     const users = await sequelize.query("SELECT * FROM citizen10k LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); // this will need changing back to citizen
// //     console.log(users);
// //     res.status(200).send(users);
// //     });

// router.get('/person', async (req, res) => {
//     console.log(req.query)
//     const suspect = await sequelize.query(`SELECT * FROM citizen WHERE surname like '${req.query.surname}%' AND forenames like '${req.query.forenames}%' AND dateOfBirth like '${req.query.dateOfBirth}%'`,
//         {replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
//             type: QueryTypes.SELECT});
//             console.log(suspect);
//     res.status(200).send(suspect);
// });


// // const findAll = Citizen.findAll()
// //   .then(citizens => {
// //     console.log("citi: ", citizens)
// //   });

// // router.get('/getAll'), (req, res) => {
// //     console.log(findAll);
// // }

// // router.get("/getAll"), (req, res) => {
// //     console.log("Get all citizens");
// //     Citizen.findAll()
// //   .then(citizens => {
// //     console.log("citi: ", citizens)
// //   });
// // }


// module.exports = router;