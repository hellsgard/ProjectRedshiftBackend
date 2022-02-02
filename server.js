const express = require("express");
const cors = require("cors");
const citizenRoute = require("./routes/citizenRoutes.js");
const peopleBankAccountRoutes = require("./routes/peopleBankAccountRoutes.js");
const sequelize = require("./utils/database");
const userRoute = require("./routes/userRoute");

const atmTransactionsRoute = require("./routes/atmTransactions.js");
const atmPointRoute = require("./routes/atmPointRoute");
const queryPersonRoute = require("./routes/queryPersonRoute");

const atmTransactionsRoute = require("./routes/atmTransactionsRoute.js");
const atmPointRoute = require("./routes/atmPointRoute");
const vehiclesRoute = require("./routes/vehiclesRoute.js");
const bankCardRoutes = require("./routes/bankCardRoutes");
const atmTransactionsRoute = require("./routes/atmTransactions.js");
const anprCameraRoute = require("./routes/anprCameraRoute");
const eposRoute = require("./routes/eposRoute");
const eposTransactionsRoute = require(".routes/eposTransactions");

const express = require("express");
const cors = require("cors");
const citizenRoute = require("./routes/citizenRoutes.js");
const peopleBankAccountRoutes = require("./routes/peopleBankAccountRoutes.js");
const sequelize = require("./utils/database");
const userRoute = require("./routes/userRoute");

const atmTransactionsRoute = require("./routes/atmTransactions.js");
const atmPointRoute = require("./routes/atmPointRoute");
const queryPersonRoute = require("./routes/queryPersonRoute");

const atmTransactionsRoute = require("./routes/atmTransactionsRoute.js");
const atmPointRoute = require("./routes/atmPointRoute");
const vehiclesRoute = require("./routes/vehiclesRoute.js");
const bankCardRoutes = require("./routes/bankCardRoutes");

//const atmTransactionsRoute = require('./routes/atmTransactions.js')
const anprCameraRoute = require("./routes/anprCameraRoute");
const vehicleObservationsRoute = require("./routes/vehicleObservationsRoute");

const atmTransactionsRoute = require("./routes/atmTransactions.js");
const anprCameraRoute = require("./routes/anprCameraRoute");

const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

app.use("/citizen", citizenRoute);
app.use("/peopleBankAccount", peopleBankAccountRoutes);
app.use("/users", userRoute);
app.use("/users", userRoute);
app.use("/bankCard", bankCardRoutes);
app.use("/atmTransactions", atmTransactionsRoute);
app.use("/atmPoint", atmPointRoute);

app.use("/citizen", citizenRoute);
app.use("/peopleBankAccount", peopleBankAccountRoutes);

app.use("/users", userRoute);
app.use("/bankCard", bankCardRoutes);
//app.use('/atmTransactions', atmTransactionsRoute)
app.use("/atmPoint", atmPointRoute);
app.use("./vehicles", vehiclesRoute);
app.use("/anprCamera", anprCameraRoute);
app.use("/vehicleObservations", vehicleObservationsRoute);

app.use("/users", userRoute);
app.use("/users", userRoute);
app.use("/bankCard", bankCardRoutes);
app.use("/atmTransactions", atmTransactionsRoute);
app.use("/atmPoint", atmPointRoute);

app.use("/queryPerson", queryPersonRoute);

app.use("./vehicles", vehiclesRoute);
app.use("/anprCamera", anprCameraRoute);

app.use("/queryPerson", queryPersonRoute);

app.use("/vehicles", vehiclesRoute);
app.use("/anprCamera", anprCameraRoute);
app.use("/epos", eposRoute);
app.use("/eposTransactions", eposTransactionsRoute);

//database connection
try {
  sequelize.authenticate();
  console.log("Connected to DB");
} catch (error) {
  console.error("Cant connect to DB");
}

app.get("/hello", () => {
  return console.log("site accessed");
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
});

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;
