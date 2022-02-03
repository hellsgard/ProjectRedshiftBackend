const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



router.get('/flees', async(req, res) => {
    console.log(req.query)
    const suspect = await sequelize.query("SELECT * FROM vehicleObservations WHERE vehicleRegistrationNumber=? AND timestamp=?", {replacements: [req.query.vehicleReg, req.query.timestamp],
        type: QueryTypes.SELECT});
        console.log(suspect);
})

module.exports = router;