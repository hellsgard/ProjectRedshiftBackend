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

router.get('/associates/', async (req, res) => {
    try{
        const assocData = await sequelize.query(`SELECT ci.citizenID, pb.forenames, pb.surname, pb.homeAddress, pb.dateOfBirth, pb.businessName, pb.businessAddress
            FROM peoplebusinessaddress pb JOIN citizen ci ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress
        WHERE forenames= '${req.query.forenames}' AND surname='${req.query.surname}' AND dateOfBirth='${req.query.dateOfBirth}')`, {
        replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
        type: QueryTypes.SELECT
    });
    res.status(200).send(assocData);
    }
    catch (error){
        res.status(500).send(error, "associates not working");
    }
    
    console.log(assocData)
})

router.get('/associatesHome/',async (req, res) => {
    try{
        const homeData = await sequelize.query(`SELECT * FROM citizen WHERE homeAddress IN (SELECT homeAddress FROM citizen 
            WHERE forenames= '${req.query.forenames}' AND surname='${req.query.surname}' AND dateOfBirth='${req.query.dateOfBirth}')`, {
            replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
            type: QueryTypes.SELECT
        });
        res.status(200).send(homeData);
    } catch (error) {
        res.status(500).send(error, "associatesHome not working");
    }
    
    console.log(homeData)
}) 

module.exports = router;

