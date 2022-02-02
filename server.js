const express = require('express');
const cors = require('cors');
const citizenRoute = require('./routes/citizenRoutes.js');
const peopleBankAccountRoutes = require('./routes/peopleBankAccountRoutes.js');
const sequelize = require ('./utils/database');
const userRoute = require ('./routes/userRoute');
<<<<<<< HEAD
const atmPointRoute = require ('./routes/atmPointRoute');
const queryPersonRoute = require('./routes/queryPersonRoute');
=======
>>>>>>> f26d50547c6ebb078bc74c8ee0d74b56b6b872ef
const atmTransactionsRoute = require('./routes/atmTransactionsRoute.js')

const vehiclesRoute = require('./routes/vehiclesRoute.js')
const bankCardRoutes = require ('./routes/bankCardRoutes')
const anprCameraRoute = require ('./routes/anprCameraRoute');
const queryIncidentRoute = require('./routes/queryIncidentRoute.js');
const querySuspectFleesRoute = require('./routes/querySuspectFleesRoute.js');

const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/citizen', citizenRoute);
app.use('/peopleBankAccount', peopleBankAccountRoutes);
app.use('/users', userRoute)
app.use('/bankCard', bankCardRoutes);
app.use('/atmTransactions', atmTransactionsRoute)
app.use('/atmPoint', atmPointRoute);


app.use('/queryPerson', queryPersonRoute);
app.use('/queryIncident', queryIncidentRoute);
app.use('/queryFlees', querySuspectFleesRoute);

app.use('./vehicles', vehiclesRoute)
app.use('/anprCamera', anprCameraRoute);


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