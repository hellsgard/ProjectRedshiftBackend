const router = require('express').Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

router.get('/basicInfo/:id', async (req,res) => {
    console.log(req.params);
    const info = await sequelize.query(
        `SELECT ci.citizenID, ci.forenames, ci.surname, ci.homeAddress, ci.dateOfBirth, ci.sex, pa.passportNumber,
         pa.nationality, pa.placeOfBirth FROM citizen ci JOIN passport pa ON pa.givenName=ci.forenames AND pa.surname=ci.surname 
         AND pa.dob=ci.dateOfBirth WHERE ci.citizenID LIKE ?`,
        {replacements: [req.params.id], type: QueryTypes.SELECT });
        console.log(info);


    // const colleagues = await sequelize.query(
    //     `SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress WHERE ci.citizenID 
    //     LIKE ?`,
    //     {replacements: [req.query.citizenID], type: QueryTypes.SELECT });
    //     console.log(colleagues);
    

    // const family = await sequelize.query(
    //     `SELECT * FROM citizen WHERE homeAddress IN (SELECT homeAddress FROM citizen WHERE ci.citizenID LIKE ?`,
    //     {replacements: [req.params.id], type: QueryTypes.SELECT });
    //     console.log(family);
    
    
    // const whereabouts = await sequelize.query(
    //    `SELECT ba.cardNumber, am.atmId, am.timestamp, am.amount, ap.operator, ap.streetName, ap.postcode, ap.latitude, ap.longitude 
    //    FROM peoplebankaccount pb JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
    //     JOIN atmpoint ap ON am.atmId=ap.atmId JOIN epos es ON ep.eposId=es.id WHERE ci.citizenID LIKE ?`,
    //    {replacements: [req.query.citizenID], type: QueryTypes.SELECT });
    //     console.log(whereabouts);
    
    res.send({info})
});

module.exports = router;