const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/anpr', async (req, res, next) => {
    console.log("query starts");
    const eposInfo = await sequelize.query(
        `SELECT ac.latitude, ac.longitude, ac.streetName, vo.vehicleRegistrationNumber, vr.make, vr.model, vr.colour, vr.driverLicenceID, vo.timestamp
    FROM citizen ci JOIN vehicleRegistration vr ON vr.forenames=ci.forenames AND vr.surname=ci.surname AND vr.dateOfBirth=ci.dateOfBirth
    JOIN vehicleObservations vo ON vr.vehicleRegistrationNo= vo.vehicleRegistrationNumber
    JOIN anprcamera ac ON vo.ANPRPointId= ac.anprId
    WHERE vo.vehicleRegistrationNumber = ?;`,
        { replacements: [req.query.vehicleRegistrationNumber], type: QueryTypes.SELECT }).then((result) => {
            console.log("is anpr stuff working?")
            console.log(eposInfo);
            console.log(req.query.vehicleRegistrationNumber);
            res.status(200).send(eposInfo);
        })
        .catch((error) => {
            next(error);
        });

});

module.exports = router;