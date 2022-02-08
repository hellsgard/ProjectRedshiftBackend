const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



router.get('/person', async (req, res) => {
    try{
        const suspect = await sequelize.query(`SELECT citizen.citizenID, citizen.forenames, citizen.surname, citizen.homeAddress, citizen.dateOfBirth, citizen.placeOfBirth ,peoplemobile.phoneNumber 
    FROM citizen 
    LEFT JOIN peoplemobile ON citizen.surname=peoplemobile.surname AND citizen.forenames=peoplemobile.forenames AND citizen.dateOfBirth=peoplemobile.dateOfBirth
    WHERE citizen.surname LIKE '${req.query.surname}%' AND citizen.forenames LIKE '${req.query.forenames}%' 
        AND citizen.dateOfBirth LIKE '${req.query.dateOfBirth}%'`, {
        replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
        type: QueryTypes.SELECT
    });
    res.status(200).send(suspect);
    }
    catch (error) {
        res.status(500).send(error, "get person not working");
    }
    
})

router.get('/byID/', async (req, res) => {
    try{
        const suspectProfile = await sequelize.query(
            `SELECT ci.citizenID, ci.forenames, ci.surname, ci.homeAddress, ci.dateOfBirth, ci.sex, pa.passportNumber,
             pa.nationality, pa.placeOfBirth, pm.phoneNumber
             FROM citizen ci 
             JOIN passport pa ON pa.givenName=ci.forenames AND pa.surname=ci.surname 
             LEFT JOIN peoplemobile pm ON pm.forenames=ci.forenames AND pm.surname=ci.surname AND pm.dateOfBirth=ci.dateOfBirth
             AND pa.dob=ci.dateOfBirth WHERE ci.citizenID LIKE '${req.query.citizenID}%'`,
            { replacements: [req.query.citizenID], type: QueryTypes.SELECT });
    
        res.status(200).send(suspectProfile[0]);
    }
    catch (error) {
        res.status(500).send(error, "get by ID not working");
    }
    
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
});

// router.get('/financialAtm/', async (req, res) => {
//     const assocData = await sequelize.query(`SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress 
//         WHERE forenames= '${req.query.forenames}' AND surname='${req.query.surname}' AND dateOfBirth='${req.query.dateOfBirth}')`, {
//         replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
//         type: QueryTypes.SELECT
//     });
//     res.status(200).send(assocData);
//     console.log(assocData)
// });



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

