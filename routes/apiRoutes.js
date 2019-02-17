const db = require("../models");
const path = require("path");

module.exports = function (app) {
  // Get seed data from userdb and render it as json at url: /api/users.  This allows us to use jquery in order to make an ajax call and then render the data into html objects (like a bootstrap media object)
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get("api/userupdate/:id", function (req, res) {
    console.log(`hello`);
    db.User.findAll({
      where: {
        id: req.params.id,
      }
    }).then(function (dbUserSpecific) {
      console.log(`DB QUERY FOR SPECIFIC USER ID: ${dbUserSpecific}`);

    })

  });

  app.get("api/test/:id", function (req, res) {
    console.log(`test, id: ${req.params.id}`);
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // User Login
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id

  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

};
