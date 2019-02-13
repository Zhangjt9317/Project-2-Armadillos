// dotenv allows for sensitive information to be stored securely
require("dotenv").config();

// express is a javascript library for implementing servers in Node
var express = require("express");

// handlebars is a templating engine
var exphbs = require("express-handlebars");

// setting a variable names app to hold the function express()
var app = express();

// This sets up the port so that it can be assigned by Heroku or listen on port8080 by default
var PORT = process.env.PORT || 8080;

//Passport is for login and authorization
var passport = require('passport');

//Simple session middleware for Express
var session = require('express-session');

// sets up body parser and request
var bodyParser = require("body-parser");
var request = require("request");

// this is for Sequelize.  Sequelize will then sync our models with the database i.e. create our schemas and seeds
//var db = require("./models"); -- Why 'db'??
//Importing Models
var models = require("./models");

// Middleware so that express will handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this sets up express to be able to use files from a directory that the client downloads to use with the app.  These are known as "static" directories.
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Sending HTML file to browser
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/html/index.html');
// });

app.post("/subscribe", (req, res) => {

  // if it's blank or null means user has not selected the captcha, so return the error.
  if (req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    return res.json({ "success": false, "msg": "Please select captcha" });
  }

  var secretKey = "6LckmY4UAAAAAKtNn0LpIu1mbA0sPr6MlwLWj3Y3";

  // req.connection.remoteAddress will provide IP address of connected user.
  var verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  //Make request to verifyUrl for reCaptcha
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    //if not successful
    if (body.success !== undefined && !body.success) {
      return res.json({ "success": false, "msg": "Failed captcha" });
    }
    //if successful code goes below...

    // **********THIS IS (MAYBE?) WHERE WE SEND DATA TO DATABASE*************


    // ***********WE ALSO NEED CODE to Reload the current document so new user can now login***************

    return res.json({ "success": true, "msg": "Successful captcha" });

  });
});

//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");



// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.User);

//Calling the Sequelize sync function.
models.sequelize.sync().then(function () {

  console.log('Nice! Database looks fine')

}).catch(function (err) {

  console.log(err, "Something went wrong with the Database Update!")

});

  app.listen(PORT, function(err) {
    if (!err)

    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
    else console.log(err)
  });

module.exports = app;
