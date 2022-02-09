const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');


router.get('/incidentVehicle', async(req, res) => {
    try {
        console.log(req.query);
        const vehicles = await sequelize.query(`SELECT c.citizenID, c.forenames, c.surname, c.homeAddress, c.dateOfBirth, c.placeOfBirth, c.sex, r.registrationID, r.registrationDate, o.vehicleRegistrationNumber, r.make,
        r.model, r.colour, r.driverLicenceID, a.anprId, o.timestamp, a.streetName, a.latitude, a.longitude FROM citizen c 
       JOIN vehicleRegistration r ON c.forenames=r.forenames AND c.surname=r.surname AND c.dateOfBirth=r.dateOfBirth
       JOIN vehicleObservations o ON o.vehicleRegistrationNumber=r.vehicleRegistrationNo JOIN anprcamera a ON a.anprId=o.ANPRPointId
       WHERE a.latitude LIKE 'rsr${req.query.latitude}%' AND a.longitude LIKE '${req.query.longitude}%' AND o.timestamp LIKE '${req.query.timeDate}%';`, {replacements: [req.query.latitude, req.query.longitude, req.query.timeDate],
        type: QueryTypes.SELECT});
        console.log("incident Vehicle search done");
        res.status(200).send(vehicles);
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