const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');
const moment = require('moment');




router.get('/incidentVehicle', async (req, res) => {
    // here we bring in the lat and lon and parse into numbers 
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const timeSec = req.query.seconds;
    let distance = parseFloat(req.query.distance);
    // get date
    let timestamp = req.query.timeDate;
    // parse into date
    timestamp = moment(timestamp) // "YYYY/MM/DD HH/MM/SS/MSMSMS"
    let dateTimeUpper = moment(timestamp).add(timeSec, 'seconds'); // doing something wrong
    let dateTimeLower = moment(timestamp).subtract(timeSec, 'seconds');
     //parse into numbers for mathsing
     let asNumLat = parseFloat(lat);
     let asNumLon = parseFloat(lon);
     let plusOneLon = "";
     let minOneLon = "";
     if (asNumLon > 0) {
          plusOneLon = asNumLon + distance;
          minOneLon = asNumLon - distance;
         plusOneLon = plusOneLon.toString();
     minOneLon = minOneLon.toString();
         } else {
              minOneLon = asNumLon + distance;
              plusOneLon = asNumLon - distance;
             plusOneLon = plusOneLon.toString();
     minOneLon = minOneLon.toString();
         }
     let plusOneLat = asNumLat + distance;
     let minOneLat = asNumLat - distance;
    // let plusOneLon = asNumLon + distance;
    // let minOneLon = asNumLon - distance;
    // parse back into string for mySQL
    plusOneLat = plusOneLat.toString();
    minOneLat = minOneLat.toString();
    plusOneLon = plusOneLon.toString();
    minOneLon = minOneLon.toString();
    // parse dates back to strings 
    dateTimeUpper = moment(dateTimeUpper).format().toString();
    dateTimeLower = moment(dateTimeLower).format().toString();

    // DATE TIME UPPER
    dateTimeUpperStart = dateTimeUpper.substr(0, 10);
    const space = " ";
    let dateTimeUpperMiddle = dateTimeUpper.substr(11, 19);
    let test = dateTimeUpperMiddle.substr(0, 8);

    const end = ".260";
    dateTimeUpperNew = dateTimeUpperStart + space + test + end;
    dateTimeUpperNew.replace("+01:00", "");
    // DATE TIME LOWER
    dateTimeLowerStart = dateTimeLower.substr(0, 10);
    let dateTimeLowerMiddle = dateTimeLower.substr(11, 19);
    let testLower = dateTimeLowerMiddle.substr(0, 8);
    dateTimeLowerNew = dateTimeLowerStart + space + testLower + end;
    dateTimeLowerNew.replace("+01:00", "");





    try {
        console.log(req.query);
        const vehicles = await sequelize.query(`SELECT c.citizenID, c.forenames, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth,
         c.sex, r.registrationID, r.registrationDate, o.vehicleRegistrationNumber, r.make, r.model, r.colour, r.driverLicenceID, a.anprId,
        o.timestamp, a.streetName, a.latitude, a.longitude FROM citizen c JOIN vehicleRegistration r ON c.forenames=r.forenames
        AND c.surname=r.surname AND c.dateOfBirth=r.dateOfBirth JOIN vehicleObservations o ON o.vehicleRegistrationNumber=r.vehicleRegistrationNo
        JOIN anprcamera a ON a.anprId=o.ANPRPointId WHERE a.latitude<='${plusOneLat}' AND a.latitude>='${minOneLat}'  AND a.longitude<='${plusOneLon}'
             AND a.longitude>='${minOneLon}' AND o.timestamp>='${dateTimeLowerNew}' AND o.timestamp<='${dateTimeUpperNew}';`,
            { type: QueryTypes.SELECT });
        console.log("incident Vehicle search done");
        console.log(vehicles);

        console.log(req.query);
        const financialInfo = await sequelize.query(`SELECT * FROM 
        atmpoint p JOIN atmTransactions t on p.atmId=t.atmId join bankcard b ON t.bankCardNumber=b.cardNumber
        JOIN peoplebankaccount ON b.bankAccountId=peoplebankaccount.bankAccountId
        WHERE p.latitude<='${plusOneLat}' AND p.latitude>='${minOneLat}'  AND p.longitude<='${plusOneLon}'
             AND p.longitude>='${minOneLon}' AND t.timestamp>='${dateTimeLowerNew}' AND t.timestamp<='${dateTimeUpperNew}';`,
            {type: QueryTypes.SELECT});
        console.log("incident finacial search done");
        console.log(financialInfo);

        console.log(req.query);
        const epos = await sequelize.query(`SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp,
         et.amount, ep.vendor, ep.latitude, ep.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
        JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
        JOIN epos ep ON et.eposID=ep.id
        WHERE ep.latitude<='${plusOneLat}' AND ep.latitude>='${minOneLat}'  AND ep.longitude<='${plusOneLon}'
             AND ep.longitude>='${minOneLon}' AND et.timestamp>='${dateTimeLowerNew}' AND et.timestamp<='${dateTimeUpperNew}';`,
            {type: QueryTypes.SELECT});
        console.log("incident epos search done");
        console.log(epos);

        res.status(200).send([vehicles, financialInfo, epos ]);
    }
    catch (error) {
        console.log(error);
    }


})

// file where we do the filtering 
module.exports = router;

// look into creating indexes for all of large tables 

// for timeframes - upper and lower time bound boxes
// have an audit database - under tighter restrictions than main database, this is where the auditing data goes.

// additional api routes - for auditing. Can display auditing information on the webpage if required. 