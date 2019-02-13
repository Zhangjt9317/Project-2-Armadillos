var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// this sets up express to be able to use files from a directory that the client downloads to use with the app.  These are known as "static" directories.
app.use(express.static("public"));

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

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

//Importing Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.User);

//Calling the Sequelize sync function
models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')


}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});


app.listen(8080, function (err) {

    if (!err)

        console.log("Site is live");

    else console.log(err)

});