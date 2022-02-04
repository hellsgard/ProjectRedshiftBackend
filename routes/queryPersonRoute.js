const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



router.get('/person', async (req, res) => {
    const suspect = await sequelize.query(`SELECT * FROM citizen WHERE surname LIKE '${req.query.surname}%' AND forenames LIKE '${req.query.forenames}%' 
        AND dateOfBirth LIKE '${req.query.dateOfBirth}%'`, {
        replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
        type: QueryTypes.SELECT
    });
    res.status(200).send(suspect);
})

router.get('/byID/', async (req, res) => {
    const suspectProfile = await sequelize.query(
        `SELECT ci.citizenID, ci.forenames, ci.surname, ci.homeAddress, ci.dateOfBirth, ci.sex, pa.passportNumber,
    pa.nationality, pa.placeOfBirth FROM citizen ci JOIN passport pa ON pa.givenName=ci.forenames AND pa.surname=ci.surname 
    AND pa.dob=ci.dateOfBirth WHERE ci.citizenID LIKE '${req.query.citizenID}%'`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT });

    res.status(200).send(suspectProfile[0]);
    console.log(suspectProfile);
    console.log("fin");
})

// file where we do the filtering 
module.exports = router;

