//load bcrypt for password encryption
var bCrypt = require('bcrypt-nodejs');


module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {

            var generateHash = function (password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {

                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken' //This msg doesn't show up?
                    });

                } else {

                    var userPassword = generateHash(password);

                    var data =

                    {
                        email: email,

                        password: userPassword,

                        firstName: req.body.firstName,

                        lastName: req.body.lastName,

                        skill: req.body.skill,

                        image: req.body.image,

                        address: req.body.address,

                        address2: req.body.address2,

                        city: req.body.city,

                        state: req.body.state,

                        zip: req.body.zip,

                        phone: req.body.phone,

                        personHours: req.body.personHours

                    };

                    //User.create() is a Sequelize method for adding new entries to the database. Notice that the values in the data object are gotten from the req.body object which contains the input from our signup form. 

                    User.create(data).then(function (newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }
                    });
                }
            });
        }

    ));

    //serialize
    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {

        User.findById(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

    //LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(    {

        // by default, local strategy uses username and password, we will override with email

        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true // allows us to pass back the entire request to the callback

    },


    function(req, email, password, done) {

        var User = user;

        //compares the password entered with the bCrypt comparison method since we stored our password with bcrypt
        var isValidPassword = function(userpass, password) {

            return bCrypt.compareSync(password, userpass);

        }

        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {

            if (!user) {

                return done(null, false, {
                    //alert("Oops");
                    message: 'Email does not exist'
                    //alert("Oops");
                });

            }

            if (!isValidPassword(user.password, password)) {

                return done(null, false, {
                    message: 'Incorrect password.'
                });

            }


            var userinfo = user.get();
            return done(null, userinfo);


        }).catch(function(err) {

            console.log("Error:", err);

            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });

        });
    }

  ));

};