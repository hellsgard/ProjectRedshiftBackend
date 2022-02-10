const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const moment = require('moment');




router.get('/incidentVehicle', async(req, res) => {
    // here we bring in the lat and lon and parse into numbers 
    const lat = req.query.latitude; 
    const lon = req.query.longitude;
    const timeSec = req.query.seconds;
    let distance = parseFloat(req.query.distance);
    // get date
    let timestamp= req.query.timeDate;
    // parse into date
    timestamp = moment(timestamp) // "YYYY/MM/DD HH/MM/SS/MSMSMS"
    console.log("HERE!!!");
    console.log(timestamp);
    let dateTimeUpper = moment(timestamp).add(timeSec, 'seconds'); // doing something wrong
    console.log(dateTimeUpper);
    let dateTimeLower = moment(timestamp).subtract(timeSec, 'seconds');
    console.log(dateTimeLower);
    console.log(lat); // this works
    //parse into numbers for mathsing
    let asNumLat = parseFloat(lat);
    let asNumLon = parseFloat(lon);
    let plusOneLat = asNumLat + distance;
    let minOneLat = asNumLat - distance;
    let plusOneLon = asNumLon + distance;
    let minOneLon = asNumLon - distance;
    // parse back into string for mySQL
    plusOneLat = plusOneLat.toString();
    minOneLat = minOneLat.toString();
    plusOneLon = plusOneLon.toString();
    minOneLon = minOneLon.toString();
    // parse dates back to strings 
    dateTimeUpper = moment(dateTimeUpper).format().toString();
    dateTimeLower =  moment(dateTimeLower).format().toString();
    console.log(dateTimeUpper);
    console.log("PLEASE WORK");
   
    // 2015-05-01 09:01:55.260
    // 2015-05-01T09:02:55+01:00

    // 2015-05-01 09:02:55+01:00.260
    // DATE TIME UPPER
    dateTimeUpperStart = dateTimeUpper.substr(0,10);
    const space = " ";
    let dateTimeUpperMiddle = dateTimeUpper.substr(11,19);
    let test = dateTimeUpperMiddle.substr(0,8);
    console.log(dateTimeUpperMiddle);
    console.log(test);
    // 09:02:55+01:00
    // 09:02:55
    console.log("dateTimeUpperMiddle");
    const end = ".260";
    dateTimeUpperNew = dateTimeUpperStart + space + test + end;
    // 2015-05-01 09:02:55.260
    // if (dateTimeUpperNew.contains("+1:00")) {
    dateTimeUpperNew.replace("+01:00","");
    console.log(dateTimeUpperNew)
    
    // DATE TIME LOWER
    dateTimeLowerStart = dateTimeLower.substr(0,10);
    let dateTimeLowerMiddle = dateTimeLower.substr(11,19);
    let testLower = dateTimeLowerMiddle.substr(0,8);
    console.log(dateTimeLowerMiddle);
    console.log(testLower);
    // 09:02:55+01:00
    // 09:02:55
    console.log("dateTimeLowerMiddle");
    dateTimeLowerNew = dateTimeLowerStart + space + testLower + end;
    // 2015-05-01 09:02:55.260
    // if (dateTimeUpperNew.contains("+1:00")) {
    dateTimeLowerNew.replace("+01:00","");
    console.log(dateTimeLowerNew);


    //QUERY FOR VEHICLES 
    //  SELECT c.citizenID, c.forenames, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth, c.sex, r.registrationID, r.registrationDate, o.vehicleRegistrationNumber, r.make,
    //  r.model, r.colour, r.driverLicenceID, a.anprId, o.timestamp, a.streetName, a.latitude, a.longitude FROM citizen c 
    // JOIN vehicleRegistration r ON c.forenames=r.forenames AND c.surname=r.surname AND c.dateOfBirth=r.dateOfBirth
    // JOIN vehicleObservations o ON o.vehicleRegistrationNumber=r.vehicleRegistrationNo JOIN anprcamera a ON a.anprId=o.ANPRPointId
    // WHERE a.latitude<=${plusOneLat} AND a.latitude>=${minOneLat}  AND a.longitude<=${plusOneLon} AND a.longitude>=${minOneLon} AND o.timestamp>=${timeStampUpper} AND o.timestamp<=${timeStampUpper};

    try {
        console.log(req.query);
        const vehicles = await sequelize.query(`SELECT c.citizenID, c.forenames, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth, c.sex, r.registrationID, r.registrationDate, o.vehicleRegistrationNumber, r.make, r.model, r.colour, r.driverLicenceID, a.anprId, o.timestamp, a.streetName, a.latitude, a.longitude FROM citizen c JOIN vehicleRegistration r ON c.forenames=r.forenames AND c.surname=r.surname AND c.dateOfBirth=r.dateOfBirth JOIN vehicleObservations o ON o.vehicleRegistrationNumber=r.vehicleRegistrationNo JOIN anprcamera a ON a.anprId=o.ANPRPointId WHERE a.latitude<='${plusOneLat}' AND a.latitude>='${minOneLat}'  AND a.longitude<='${plusOneLon}' AND a.longitude>='${minOneLon}' AND o.timestamp>='${dateTimeLowerNew}' AND o.timestamp<='${dateTimeUpperNew}';`, 
           {type: QueryTypes.SELECT});
        console.log("incident Vehicle search done");
        console.log(vehicles);



        // console.log(req.query);
        // const financialInfo = await sequelize.query(`SELECT * FROM 
        // atmpoint p JOIN atmTransactions t on p.atmId=t.atmId join bankcard b ON t.bankCardNumber=b.cardNumber
        // JOIN peoplebankaccount ON b.bankAccountId=peoplebankaccount.bankAccountId
        // WHERE p.latitude LIKE '${req.query.latitude}%' AND p.longitude LIKE '${req.query.longitude}%' AND t.timestamp LIKE '${req.query.timeDate}%' LIMIT 5;`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
        // type: QueryTypes.SELECT});
        // console.log("incident finacial search done");

        res.status(200).send([vehicles]);
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