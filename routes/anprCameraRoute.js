const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/readAll', async (req, res) => {
    const anprCamera = await sequelize.query("SELECT * FROM anprcamera LIMIT 10", { type: sequelize.QueryTypes.SELECT } ); 
    console.log(anprCamera);
    res.status(200).send(anprCamera);
    });

module.exports = router;