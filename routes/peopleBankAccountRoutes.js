const router = require('express').Router();
const BankAccount = require('../models/peopleBankAccount.js');
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/readAll', async (req, res) => {
    const users = await sequelize.query("SELECT * FROM peoplebankaccount LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); 
    console.log(users);
    res.status(200).send(users);
    });




// const findAll = BankAccount.findAll()
//   .then(bankAccounts => {
//     console.log("bank accounts: ", bankAccounts);
//   });

// findAll();

module.exports = router;