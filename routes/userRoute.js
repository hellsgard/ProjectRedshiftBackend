const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');



// import in the model - will need to use models for the passport validation
const {User} = require('../models/users.js');

router.get('/readAll', async (req, res) => {
const users = await sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT } );
console.log(users);
});


module.exports = router;