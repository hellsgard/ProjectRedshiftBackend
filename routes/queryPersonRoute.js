const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');



router.get('/person', async (req, res) => { //  passport.authenticate('jwt', { session: false }),
    try {
    const forAudit = `SELECT * FROM citizen WHERE surname LIKE ${req.query.surname}% AND forenames LIKE ${req.query.forenames}% 
    AND dateOfBirth LIKE ${req.query.dateOfBirth}%`;
    const suspect = await sequelize.query(`SELECT * FROM citizen WHERE surname LIKE '${req.query.surname}%' AND forenames LIKE '${req.query.forenames}%' 
        AND dateOfBirth LIKE '${req.query.dateOfBirth}%'`, {
        // replacements: [req.query.surname, req.query.forenames, req.query.dateOfBirth],
        type: QueryTypes.SELECT
    }); 
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(date);
    console.log(req.query.user);
    await sequelize.query(`INSERT INTO audit (time, user, query) VALUES ('${date}', '${req.user}', '${forAudit}')`)
    res.status(200).send(suspect);
    } 
    catch (error) {
    console.error(error);
};})




router.get('/mobile', async(req, res, next) => {
    const mobileInfo = await sequelize.query( `SELECT * FROM peoplemobile WHERE forenames=? AND surname=? AND dateOfBirth=?;`,
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
    const callRecords = await sequelize.query( `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.callerMSISDN=p.phoneNumber WHERE receiverMSISDN=?;`,
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
    const callRecords = await sequelize.query( `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.receiverMSISDN=p.phoneNumber WHERE callerMSISDN=?;`,
         { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }).then((result) => {
        console.log("call records outbound finished");
        // console.log(result);
        res.status(200).send(result);
    })
    .catch((error) => {
        next(error);
    });
})


router.get('/byID',  async (req, res) => {
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

