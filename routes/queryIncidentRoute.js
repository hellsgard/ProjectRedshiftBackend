const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');


router.get('/incidentVehicle', async(req, res) => {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const asNumLat = parseFloat(lat);
    let plusOneLat = asNumLat + 0.005;
    let minusOneLat = asNumLat - 0.005;
    const asNumLon = parseFloat(lon);
    let plusOneLon = asNumLon + 0.005;
    let minusOneLon = asNumLon - 0.005;

    // parse back into string
    plusOneLat = plusOneLat.toString();
    minusOneLat = minusOneLat.toString();
    plusOneLon = plusOneLon.toString();
    minusOneLon = minusOneLon.toString();


    try {
        console.log(req.query);
        const vehicles = await sequelize.query(`SELECT c.citizenID, c.forenames, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth, c.sex, r.registrationID, r.registrationDate, o.vehicleRegistrationNumber, r.make,
        r.model, r.colour, r.driverLicenceID, a.anprId, o.timestamp, a.streetName, a.latitude, a.longitude FROM citizen c 
       JOIN vehicleRegistration r ON c.forenames=r.forenames AND c.surname=r.surname AND c.dateOfBirth=r.dateOfBirth
       JOIN vehicleObservations o ON o.vehicleRegistrationNumber=r.vehicleRegistrationNo JOIN anprcamera a ON a.anprId=o.ANPRPointId
       WHERE a.latitude LIKE '${req.query.latitude}%' AND a.longitude LIKE '${req.query.longitude}%' AND o.timestamp LIKE '${req.query.timeDate}%' LIMIT 5;`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
        type: QueryTypes.SELECT});
        console.log("incident Vehicle search done");

        console.log(req.query);
        const financialInfo = await sequelize.query(`SELECT * FROM 
        atmpoint p JOIN atmTransactions t on p.atmId=t.atmId join bankcard b ON t.bankCardNumber=b.cardNumber
        JOIN peoplebankaccount ON b.bankAccountId=peoplebankaccount.bankAccountId
        WHERE p.latitude LIKE '${req.query.latitude}%' AND p.longitude LIKE '${req.query.longitude}%' AND t.timestamp LIKE '${req.query.timeDate}%' LIMIT 5;`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
        type: QueryTypes.SELECT});
        console.log("incident finacial search done");

        const eposInfo = await sequelize.query(`SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
            FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
            JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
            JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
            JOIN epos ep ON et.eposID=ep.id
            WHERE et.timestamp BETWEEN '${req.query.lowerTime}%' AND '${req.query.higherTime}%'
            AND ep.latitude BETWEEN '${req.query.minusOneLat}%' AND '${req.query.plusOneLat}%'
            AND ep.longitude BETWEEN '${req.query.minusOneLon}%' AND '${req.query.plusOneLon}%';`,
             {replacements: [req.query.timestampLower, req.query.timestampHigher, req.query.lowerLat, req.query.higherLat, req.query.lowerLong, req.query.higherLong],
            type: QueryTypes.SELECT});
            console.log("incident epos search done");

        console.log(req.query);
        const callsOut = await sequelize.query(`SELECT * FROM 
        celltower t JOIN mobileCallRecords r ON r.callCellTowerId=t.cellTowerId
        JOIN mobile m ON m.phoneNumber=r.callerMSISDN JOIN peoplemobile p ON
        p.phoneNumber=m.phoneNumber JOIN citizen c ON c.forenames=p.forenames AND c.surname=p.surname
        AND c.dateOfBirth=p.dateOfBirth AND c.homeAddress=p.address 
        WHERE timestamp LIKE '${req.query.timeDate}%' AND latitude LIKE '${req.query.latitude}%' AND longitude LIKE '${req.query.longitude}%' LIMIT 5;`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
            type: QueryTypes.SELECT});
            console.log("incident calls out search done");

        res.status(200).send([financialInfo, vehicles, eposInfo, callsOut]);

        
    }
    catch (error) {
        console.log(error);
    }


    // try {
    //     console.log(req.query);
    //     const financialInfo = await sequelize.query(`SELECT * FROM 
    //     atmpoint;`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
    //     type: QueryTypes.SELECT});
    //     console.log("incident finacial search done");
    //     res.status(200).send(financialInfo);
    // }
    // catch (error) {
    //     console.log(error);
    // }
})

 // file where we do the filtering 
module.exports = router;

// look into creating indexes for all of large tables 

// for timeframes - upper and lower time bound boxes
// have an audit database - under tighter restrictions than main database, this is where the auditing data goes.

// additional api routes - for auditing. Can display auditing information on the webpage if required. 