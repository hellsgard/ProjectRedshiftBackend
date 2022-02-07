const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');


// router.get('/readAll', async (req, res) => {
//     const bankCards = await sequelize.query("SELECT * FROM bankcard LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); // this will need changing back to citizen
//     console.log(bankCards);
//     res.status(200).send(bankCards);
//     });

router.get('/readCard', async (req, res) => {
    const card = await sequelize.query("SELECT * FROM bankcard WHERE cardNumber=?, sortCode=?, accountNumber=?, bank=?", {replacements: [$cardNumber
        , $sortCode, $accountNumber, $bank],
    type: QueryTypes.SELECT});
    res.status(200).send(card);
})






module.exports = router;