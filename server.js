const express = require('express');
const cors = require('cors');
const userRoute = require ('./routes/userRoute');
const queryIncidentRoute = require('./routes/queryIncidentRoute.js');
const queryPersonRoute = require('./routes/queryPersonRoute');
const querySuspectFleesRoute = require('./routes/querySuspectFleesRoute.js');
const mapDataRoute = require('./routes/mapDataRoute.js');
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;


const app = express();

// COMMON MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES

app.use('/queryPerson', passport.authenticate('jwt'), queryPersonRoute); // means everything has to be authenticated
app.use('/queryIncident', passport.authenticate('jwt'), queryIncidentRoute);
app.use('/queryFlees', passport.authenticate('jwt'), querySuspectFleesRoute);
app.use('/mapData', passport.authenticate('jwt'), mapDataRoute);
app.use('/users', userRoute)



// //PASSPORT TRY 2
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const User = require('./models/users.js');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(function(username, password, done) {

  User.findOne({where: {username:username}})
  .then(user => {
    bcrypt.compare(password, user.password, (err, result) => {
      if(err) return done(err, false);
      return done(null, user);
    })

  })
  .catch(error => done(error, user)); // saying it can't find user?
})); 

// put in a function for authentication here
passport.serializeUser(function(user,done) {
  return done(null, user.id);
}); // keeps a person signed in 
passport.deserializeUser(function(id, done) {
  User.findByPk(id).then(user => done(null, user)).catch(error => done(error, false));
}); // for logging out?

//JWT strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Marmoset';
opts.algorithms = ['HS256'];

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findByPk(jwt_payload.sub).then(user => done(null, user)).catch(err => done(err, false));
}));



app.use(function(err, req, res, next) {
  console.log(err);
});

;

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}.`);
});

module.exports = server;
