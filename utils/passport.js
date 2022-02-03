// const LocalStrategy = require('passport-local').Strategy
// const mysql = require('mysql');
// const sequelize = require("../utils/database.js");
// const bodyParser = require('body-parser');
// const session = require('express-session');  
// const passport = require('passport');  // authentication
// const connectEnsureLogin = require('connect-ensure-login');// authorization
// const User = require('.models/users.js'); // Users Model

// const app = express();

// // make sure express is using the login details to the RDS
// app.use(sequelize);

// // Configure Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Local Strategy
// passport.use(User.createStrategy());

// // To use with sessions
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Route to Homepage
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/');
// });

// // Route to Login Page
// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/login');
// });

// // Route to Dashboard
// app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//   and your session expires in ${req.session.cookie.maxAge} 
//   milliseconds.<br><br>
//   <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
// });

// // Route to Secret Page
// app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.sendFile(__dirname + '/scenario1');
// });

// // Route to Log out
// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/login');
// });

// // Post Route: /login
// app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
// 	console.log(req.user)
// 	res.redirect('/home');
// });

