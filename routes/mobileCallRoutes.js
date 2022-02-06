const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');


router.get('/mobile/', async (req, res) => {
    const mobileInfo = await sequelize.query(
        `SELECT * from citizen WHERE citizenID=1563521589;`,
        { replacements: [req.body.dateOfBirth], type: QueryTypes.SELECT });
    console.log(mobileInfo[0]);

    res.status(200).send(mobileInfo[0]);
    console.log(mobileInfo);
    console.log("fin");
});





module.exports = router;