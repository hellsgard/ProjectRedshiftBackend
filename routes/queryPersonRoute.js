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



router.get('/mobile', async(req, res, next) => {
    const mobileInfo = await sequelize.query( `SELECT * FROM peoplemobile WHERE forenames=? AND surname=? AND dateOfBirth=?;`,
         { replacements: [req.query.forenames, req.query.surname, req.query.dateOfBirth], type: QueryTypes.SELECT }).then((mobileInfo) => {
        console.log(mobileInfo);
        res.status(200).send(mobileInfo);
    })
    .catch((error) => {
        next(error);
    });
})

router.get('/callRecords', async (req, res, next) => {
    const callRecords = await sequelize.query( `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.callerMSISDN=p.phoneNumber WHERE receiverMSISDN=?;`,
         { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }).then((result) => {
        // console.log(result);
        res.status(200).send(result);
    })
    .catch((error) => {
        next(error);
    });
})

router.get('/callRecordsOutbound', async (req, res, next) => {
    const callRecords = await sequelize.query( `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.receiverMSISDN=p.phoneNumber WHERE callerMSISDN='07700 790764';`,
         { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }).then((result) => {
        // console.log(result);
        res.status(200).send(result);
    })
    .catch((error) => {
        next(error);
    });
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
});

router.get('/associates/'), async (req, res) => {
    const suspectProfile = await sequelize.query(
        `SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress 
            WHERE forenames= ? AND surname=? AND dateOfBirth=?)`,
        { replacements: [req.query.forenames, req.query.surname, req.query.dateOfBirth], type: QueryTypes.SELECT });

    res.status(200).send(suspectProfile[0]);
    console.log(suspectProfile);
    console.log("checking");
};

router.get('/financialEpos', async (req, res, next) => {
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

// file where we do the filtering 
module.exports = router;

