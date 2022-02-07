// const router = require('express').Router();
// const { QueryTypes } = require('sequelize');
// const sequelize = require('../utils/database.js');

// router.get('/readAll', async (req, res) => {
//     const atmPoints = await sequelize.query("SELECT * FROM atmpoint LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); 
//     console.log(atmPoints);
//     res.status(200).send(atmPoints);
//     });

// module.exports = router;