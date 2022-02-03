const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



router.get('/incident', async(req, res) => {
    console.log(req.query);
    const suspect = await sequelize.query("SELECT * FROM eposTransactions WHERE timestamp=?", {replacements: [req.query.timeDate],
        type: QueryTypes.SELECT});
        console.log(suspect);
})

 // file where we do the filtering 
module.exports = router;

// look into creating indexes for all of large tables 

// for timeframes - upper and lower time bound boxes
// have an audit database - under tighter restrictions than main database, this is where the auditing data goes.

// additional api routes - for auditing. Can display auditing information on the webpage if required. 