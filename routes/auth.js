var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {

  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/timebank',
    failureRedirect: '/' //is there a way for our registration modal to pop up when refreshing page?
  }
  ));

  //*************** */Dashboard needs to be replaced with our protected area which is '/timebank', which is our available_services.html page ********************* 
  //app.get('/dashboard', isLoggedIn, authController.dashboard);

  // This code below gives an error message of "Failed to lookup view "timebank" in views directory "./views""

  app.get('/timebank', isLoggedIn);

  app.get('/logout', authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/timebank',

    failureRedirect: '/'
  }

  ));

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

      return next();

    res.redirect('/');

  }

};