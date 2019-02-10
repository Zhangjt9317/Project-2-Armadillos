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

// sets up body parser and request
var bodyParser = require("body-parser");
var request = require("request");

// this is for Sequelize.  Sequelize will then sync our models with the database i.e. create our schemas and seeds
var db = require("./models");

// Middleware so that express will handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this sets up express to be able to use files from a directory that the client downloads to use with the app.  These are known as "static" directories.
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sending HTML file to browser
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

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

    // **********THIS IS WHERE WE SEND DATA TO DATABASE*************


    // ***********WE ALSO NEED CODE to Reload the current document so new user can now login***************

    return res.json({ "success": true, "msg": "Successful captcha" });

  });
});

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

// TODO:This has something to do with resetting the database during testing?  See code below...
var syncOptions = { force: false }; // check this out !!!

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Sequelize is taking our models files and rendering the data as directed by the code in those files (user.js) instead of us building the code in mysql, THEN once the schema has been run and the table created based on the definitions in the models folder, we are adding in some seed data to the User table.  THEN, once the seeds have been planted into the schema: start the server listening (for get and post requests from the localhost.) ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  db.User.create({
    firstName: 'Leonard',
    lastName: 'Nimoy',
    skill: 'Logic and Mind Melding',
    email: 'spock@vulcan.com',
    image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png',
    password: 'notlogicalcaptain',
    address: '314 Vulcan st.',
    city: 'Shi\'Kahr',
    state: 'HS',
    zip: '74358',
    personHours: 99

  });
  db.User.create({
    firstName: 'William',
    lastName: 'Shatner',
    skill: 'Captain',
    email: 'kirk@enterprise.com',
    image: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492180288/articles/2015/06/20/captain-kirk-s-new-wild-ride/150619-joiner-shatner-tease_ixfuni',
    password: 'beammeupscotty',
    address: '2458 Linden Ave.',
    city: 'Chicago',
    state: 'IL',
    zip: '98765',
    personHours: -5
  });

}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
