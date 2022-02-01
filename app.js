const express = require('express');
const cors = require('cors');
const citizenRoute = require('./routes/citizenRoutes');

const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/citizen', citizenRoute);
app.use('/peopleBankAccount.js', peopleBankAccountRoute);



// app.use('/users.js', userRoute)

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err.message);
})

// DIFFERENT DATABASE CONNECTIONS, FOR TESTING AND PRODUCTION
let DBname = `<put DB name in here>`
// let DBname = `<Put test DB name in here>`  //                <- Test DB


    
















const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;