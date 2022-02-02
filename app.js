const express = require('express');
const cors = require('cors');
const citizenRoute = require('./routes/citizenRoutes.js');
const peopleBankAccountRoutes = require('./routes/peopleBankAccountRoutes.js');
const sequelize = require ('./utils/database');
const userRoute = require ('./routes/userRoute');
const atmTransactionsRoute = require('./routes/atmTransactionsRoute.js')
const atmPointRoute = require ('./routes/atmPointRoute');
const vehiclesRoute = require('./routes/vehiclesRoute.js')


const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/citizen', citizenRoute);
app.use('/peopleBankAccount', peopleBankAccountRoutes);
app.use('/users', userRoute)
app.use('/atmTransactions', atmTransactionsRoute)
app.use('/atmPoint', atmPointRoute);
app.use('./vehicles', vehiclesRoute)

//database connection
try {
  sequelize.authenticate();
  console.log('Connected to DB');
} catch (error) {
  console.error('Cant connect to DB')
}

app.get("/hello", () => {
  return console.log("site accessed");
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err.message);
})


const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;