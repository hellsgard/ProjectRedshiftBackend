const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

router.get("/readAll", async (req, res) => {
  const eposTransactions = await sequelize.query(
    "SELECT * FROM eposTransactions LIMIT 10",
    { type: sequelize.QueryTypes.SELECT }
  );
  console.log(eposTransactions);
  res.status(200).send(eposTransactions);
});

module.exports = router;
