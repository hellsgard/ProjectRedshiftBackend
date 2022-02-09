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



router.get('/mobile', async (req, res, next) => {
    const mobileInfo = await sequelize.query(`SELECT * FROM peoplemobile WHERE forenames=? AND surname=? AND dateOfBirth=?;`,
        { replacements: [req.query.forenames, req.query.surname, req.query.dateOfBirth], type: QueryTypes.SELECT }).then((mobileInfo) => {
            console.log("moile")
            console.log(mobileInfo);
            res.status(200).send(mobileInfo);
        })
        .catch((error) => {
            next(error);
        });
})

router.get('/callRecords', async (req, res, next) => {
    console.log("call records inbound started");
    const callRecords = await sequelize.query(`SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.callerMSISDN=p.phoneNumber WHERE receiverMSISDN=?;`,
        { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }).then((result) => {
            console.log("call records inbound finished");
            // console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            next(error);
        });
})

router.get('/callRecordsOutbound', async (req, res, next) => {
    console.log("call records outbound started");
    const callRecords = await sequelize.query(`SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.receiverMSISDN=p.phoneNumber WHERE callerMSISDN=?;`,
        { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }).then((result) => {
            console.log("call records outbound finished");
            // console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            next(error);
        });
})


router.get('/byID', async (req, res) => {
    const suspectProfile = await sequelize.query(
        `SELECT * FROM citizen c JOIN peoplemobile m on c.homeAddress=m.address WHERE citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT });

    res.status(200).send(suspectProfile[0]);
    console.log(suspectProfile);
    console.log("fin");
});

router.get('/associates'), async (req, res) => {
    const suspectProfile = await sequelize.query(
        `SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress 
            WHERE forenames= ? AND surname=? AND dateOfBirth=?)`,
        { replacements: [req.query.forenames, req.query.surname, req.query.dateOfBirth], type: QueryTypes.SELECT });

    res.status(200).send(suspectProfile[0]);
    console.log(suspectProfile);
    console.log("checking");
};

router.get('/eposData', async (req, res, next) => {
    console.log("query starts");
    const eposInfo = await sequelize.query(
        `SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
        JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
        JOIN epos ep ON et.eposID=ep.id
        WHERE ci.citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("hello")
            console.log(result);
            console.log(req.query.citizenID);
            res.status(200).send(result);
        })
        .catch((error) => {
            next(error);
        });
});

router.get('/atmData', async (req, res, next) => {
    console.log("query starts");
    const atmPoint = await sequelize.query(
        `SELECT ba.cardNumber, am.atmId, am.timestamp, am.amount, ap.operator, ap.streetName, ap.postcode, ap.latitude, ap.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId
        JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
        JOIN atmpoint ap ON am.atmId=ap.atmId
        WHERE ci.citizenID=?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("hello")
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log('Error is',error)
            next(error);
        });
});

router.get('/anpr', async (req, res, next) => {
    console.log("query starts");
    const eposInfo = await sequelize.query(
        `SELECT ac.latitude, ac.longitude, ac.streetName, vo.vehicleRegistrationNumber, vr.make, vr.model, vr.colour, vr.driverLicenceID, vo.timestamp
    FROM citizen ci JOIN vehicleRegistration vr ON vr.forenames=ci.forenames AND vr.surname=ci.surname AND vr.dateOfBirth=ci.dateOfBirth
    JOIN vehicleObservations vo ON vr.vehicleRegistrationNo= vo.vehicleRegistrationNumber
    JOIN anprcamera ac ON vo.ANPRPointId= ac.anprId
    WHERE ci.citizenID = ?;`,
        { replacements: [req.query.citizenID], type: QueryTypes.SELECT }).then((result) => {
            console.log("is anpr stuff working?")
            console.log(result);
            console.log(req.query.citizenID);
            res.status(200).send(result);
        })
        .catch((error) => {
            next(error);
        });
});

// file where we do the filtering 
module.exports = router;

