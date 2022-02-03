const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



router.get('/person', async(req, res) => {
    console.log(req.query)
    const suspect = await sequelize.query(`SELECT * FROM citizen WHERE surname LIKE '${req.query.surname}%' AND forenames LIKE '${req.query.forenames}%' 
        AND dateOfBirth LIKE '${req.query.dateOfBirth}%'`, {replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
        type: QueryTypes.SELECT});
        console.log(suspect);
        res.status(200).send(suspect);
})

 // file where we do the filtering 
module.exports = router;

