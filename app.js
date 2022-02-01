const express = require('express');
const cors = require('cors');
const citizenRoute = require('./routes/citizenRoutes.js');
const peopleBankAccountRoutes = require('./routes/peopleBankAccountRoutes.js');
const sequelize = require ('./utils/database');
const userRoute = require ('./routes/userRoute');


const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/citizen', citizenRoute);
app.use('/peopleBankAccount', peopleBankAccountRoutes);
app.use('/users', userRoute)

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

// // DIFFERENT DATABASE CONNECTIONS, FOR TESTING AND PRODUCTION
// let DBname = `<put DB name in here>`
// // let DBname = `<Put test DB name in here>`  //                <- Test DB

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;