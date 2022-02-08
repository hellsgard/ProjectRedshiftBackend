const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/', async (req, res, next) => {
    console.log("query starts");
    console.log("This is ", req.query.citizenID)
    const anpr = await sequelize.query(
    `SELECT ac.latitude, ac.longitude, ac.streetName, vo.vehicleRegistrationNumber, vr.make, vr.model, vr.colour, vr.driverLicenceID, vo.timestamp
    FROM citizen ci JOIN vehicleRegistration vr ON vr.forenames=ci.forenames AND vr.surname=ci.surname AND vr.dateOfBirth=ci.dateOfBirth
    JOIN vehicleObservations vo ON vr.vehicleRegistrationNo= vo.vehicleRegistrationNumber
    JOIN anprcamera ac ON vo.ANPRPointId= ac.anprId
    WHERE ci.citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("anpr hello")
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log('Error is',error)
            next(error);
        });
});
    

// file where we do the filtering 
module.exports = router;

