const express = require('express');
const cors = require('cors');
const citizenRoutes = require('./routes/citizenRoutes.js');
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
const mapDataRoute = require('./routes/mapDataRoute.js');
const suspectProfile = require('./routes/suspectProfile.js');
const mobileCallRoutes = require('./routes/mobileCallRoutes.js');
const passport = require('passport');
const flash = require('express-flash'); 
const session = require('express-session'); 
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;



const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
// app.use('/citizen', citizenRoutes);
// app.use('/peopleBankAccount', peopleBankAccountRoutes);
// app.use('/bankCard', bankCardRoutes);
// app.use('/atmTransactions', atmTransactionsRoute)
// app.use('/atmPoint', atmPointRoute);
app.use('/queryPerson', queryPersonRoute);
app.use('/queryIncident', queryIncidentRoute);
app.use('/queryFlees', querySuspectFleesRoute);
app.use('/mapData', mapDataRoute);
// app.use('./vehicles', vehiclesRoute)
// app.use('/anprCamera', anprCameraRoute);
// app.use('/suspectProfile', suspectProfile)
// app.use('./basicInfo', suspectProfile);
// app.use('./mobileCall', mobileCallRoutes);


// //PASSPORT TRY 2
app.use(logger('dev'));
app.use(passport.initialize());
// app.use(passport.session());
// app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const User = require('./models/users.js');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({where: {username:username}}).then(user => {
    // if (password === user.password) return done(null, user);
     if (bcrypt.compare(password, user.password)) return done(null, user); 
  })
  .catch(error => done(error, false)); // put in message here that says wrong
})); 

// put in a function for authentication here
passport.serializeUser(function(user,done) {
  return done(null, user.id);
}); // keeps a person signed in - but no session..?
passport.deserializeUser(function(id, done) {
  User.findByPk(id).then(user => done(null, user)).catch(error => done(error, false));
}); // for logging out

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Marmoset';
opts.algorithms = ['HS256'];

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findById(jwt_payload.sub, function (err, user) { // expiration occurs in the jwt payload
      console.log(err, user);
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

// // This should be the cookies middleware
// app.get('/', function(req, res){
//   req.cookies.rememberme;
//   console.log("cookies");
//   });

app.use('/users', userRoute)

app.use(function(err, req, res, next) {
  console.log(err);
});



// app.get('/logout', function (req, res){ // for logging out - should this be in the userRoutes?
//   req.session.destroy(function (err) {
//     res.redirect('/'); 
//     console.log('on logout page');
//   });
// });



// app.use(flash());
// app.use(session({
//   secret: 'the secret', 
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 100 * 60 * 60 }, // I think this is a 1hr expiry for cookies
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// //whenever an app.post comes in this middleware should run
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;
