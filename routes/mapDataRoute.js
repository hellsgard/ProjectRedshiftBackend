const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/eposMap', async (req, res, next) => {
    console.log("query starts");
    console.log("This is ", req.query.citizenID)
    const eposInfo = await sequelize.query(
        `SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
        JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
        JOIN epos ep ON et.eposID=ep.id
        WHERE ci.citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("epos hello")
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log('Error is',error)
            next(error);
        });
});

router.get('/anprMap', async (req, res, next) => {
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

router.get('/atmMap', async (req, res, next) => {
    console.log("query starts");
    console.log("This is ", req.query.citizenID)
    const atmPoint = await sequelize.query(
        `SELECT ba.cardNumber, am.atmId, am.timestamp, am.amount, ap.operator, ap.streetName, ap.postcode, ap.latitude, ap.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId
        JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
        JOIN atmpoint ap ON am.atmId=ap.atmId
        WHERE ci.citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("atm hello")
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

