const express = require("express");
const router = express.Router();
// const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const Citizen = require('../models/citizen');

const { Op, QueryTypes } = require('sequelize');

router.get("/person", async (req, res) => {
  // passport.authenticate is how the query is protected  -> middleware
  try {
    const forAudit = `SELECT * FROM citizen WHERE surname LIKE ${req.query.surname}% AND forenames LIKE ${req.query.forenames}% 
    AND dateOfBirth LIKE ${req.query.dateOfBirth}%`;
    const query = {};

    for (let key in req.query){

        if (!req.query[key]) continue;

        query[key] = {[Op.like]: `%${req.query[key]}%`};
    }
    const suspect = await Citizen.findAll({where: query});

    // }
    // if(req.query.forenames) query.forenames= {[Op.like]: req.query.forenames}; 
    // if(req.query.surname) query.surname= {[Op.like]: req.query.surname}; 
    // if(req.query.dateOfBirth) query.dateOfBirth= {[Op.like]: req.query.dateOfBirth}; 
    // const suspect = await Citizen.findAll({where: req.query})
    // console.log("Citizen:", suspect);
    // const suspect = await sequelize.query(
    //   `SELECT * FROM citizen WHERE surname LIKE '${req.query.surname}%' AND forenames LIKE '${req.query.forenames}% ' 
    //     AND dateOfBirth LIKE '${req.query.dateOfBirth}%'`,
    //   {
    //     replacements: [
    //       req.query.surname,
    //       req.query.forenames,
    //       req.query.dateOfBirth,
    //     ],
    //     type: QueryTypes.SELECT,
    //   }
    // );

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log(date);
    console.log(req.user.id); 
    await sequelize.query(
      `INSERT INTO audit (time, user, query, type) VALUES (?, ?, ?, 'Person Search')`,
      {
       replacements: [
           date,
           req.user.id,
           forAudit,
        
       ],
        type: QueryTypes.INSERT,
      }
    );
    res.status(200).send(suspect);
  } catch (error) {
    console.error(error);
  }
});

router.get("/mobile", async (req, res, next) => {
  const mobileInfo = await sequelize
    .query(
      `SELECT * FROM peoplemobile WHERE forenames=? AND surname=? AND dateOfBirth=?;`,
      {
        replacements: [
          req.query.forenames,
          req.query.surname,
          req.query.dateOfBirth,
        ],
        type: QueryTypes.SELECT,
      }
    )
    .then((mobileInfo) => {
      console.log("moile");
      console.log(mobileInfo);
      res.status(200).send(mobileInfo);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/callRecords", async (req, res, next) => {
  console.log("call records inbound started");
  const callRecords = await sequelize
    .query(
      `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.callerMSISDN=p.phoneNumber WHERE receiverMSISDN=?;`,
      { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }
    )
    .then((result) => {
      console.log("call records inbound finished");
      // console.log(result);
      res.status(200).send(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/callRecordsOutbound", async (req, res, next) => {
  console.log("call records outbound started");
  const callRecords = await sequelize
    .query(
      `SELECT * FROM mobileCallRecords r JOIN peoplemobile p ON r.receiverMSISDN=p.phoneNumber WHERE callerMSISDN=?;`,
      { replacements: [req.query.phoneNumber], type: QueryTypes.SELECT }
    )
    .then((result) => {
      console.log("call records outbound finished");
      // console.log(result);
      res.status(200).send(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/byID", async (req, res) => {
  const suspectProfile = await sequelize.query(
    `SELECT * FROM citizen c JOIN peoplemobile m on c.homeAddress=m.address WHERE citizenID=?;`,
    { replacements: [req.query.citizenID], type: QueryTypes.SELECT }
  );

  res.status(200).send(suspectProfile[0]);
  console.log(suspectProfile);
  console.log("fin");
});

router.get("/associates"),
  async (req, res) => {
    const suspectProfile = await sequelize.query(
      `SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress 
            WHERE forenames= ? AND surname=? AND dateOfBirth=?)`,
      {
        replacements: [
          req.query.forenames,
          req.query.surname,
          req.query.dateOfBirth,
        ],
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).send(suspectProfile[0]);
    console.log(suspectProfile);
    console.log("checking");
  };

router.get("/financialEpos", async (req, res, next) => {
  console.log("query starts");
  const eposInfo = await sequelize
    .query(
      `SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
        JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
        JOIN epos ep ON et.eposID=ep.id
        WHERE ci.citizenID=?;`,
      { replacements: [req.query.citizenID], type: QueryTypes.SELECT }
    )
    .then((result) => {
      console.log("hello");
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
