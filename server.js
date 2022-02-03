const express = require('express');
const cors = require('cors');
const citizenRoute = require('./routes/citizenRoutes.js');
const peopleBankAccountRoutes = require('./routes/peopleBankAccountRoutes.js');
const userRoute = require ('./routes/userRoute');
const atmPointRoute = require ('./routes/atmPointRoute');
const queryPersonRoute = require('./routes/queryPersonRoute');
const atmTransactionsRoute = require('./routes/atmTransactionsRoute.js')
const vehiclesRoute = require('./routes/vehiclesRoute.js')
const bankCardRoutes = require ('./routes/bankCardRoutes')
const anprCameraRoute = require ('./routes/anprCameraRoute');
const queryIncidentRoute = require('./routes/queryIncidentRoute.js');
const querySuspectFleesRoute = require('./routes/querySuspectFleesRoute.js');
const passport = require('passport');
const flash = require('express-flash'); 
const session = require('express-session'); 

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


// PASSPORT
const init = require('./passport-config.js');
const UserSchema = require('./models/users.js');

init(passport, username => {
  return UserSchema.find(user => user.username === username)
});

app.use(flash());
app.use(session({
  secret: 'the secret', 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 }, // I think this is a 1hr expiry for cookies
}))

app.use(passport.initialize());
app.use(passport.session());

//whenever an app.post comes in this middleware should run
app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}))

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;
