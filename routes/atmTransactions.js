const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');


router.get('/readAll', async (req, res) => {
    const transactions = await sequelize.query("SELECT * FROM atmTransactions LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); 
    console.log(transactions);
    res.status(200).send(transactions);
    });

module.exports = router;