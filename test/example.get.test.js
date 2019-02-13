// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var server = require("../server");
// var db = require("../models");
// var expect = chai.expect;

// Setting up the chai http plugin
// chai.use(chaiHttp);

// var request;

// describe("GET /api/users", function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  // beforeEach(function () {
  //   request = chai.request(server);
  //   return db.sequelize.sync({ force: true });
  // });

  // it("should find all examples", function (done) {
    // Add some examples to the db to test with
    // db.User.bulkCreate([
    //   {
    //     firstName: 'Leonard',
    //     lastName: 'Nimoy',
    //     skill: 'Logic and Mind Melding',
    //     email: 'spock@vulcan.com',
    //     image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png',
    //     password: 'notlogicalcaptain',
    //     address: '314 Vulcan st.',
    //     city: 'Shi\'Kahr',
    //     state: 'HS',
    //     zip: '74358',
    //     personHours: 99
    //   },
    //   {
    //     firstName: 'William',
    //     lastName: 'Shatner',
    //     skill: 'Captain',
    //     email: 'kirk@enterprise.com',
    //     image: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492180288/articles/2015/06/20/captain-kirk-s-new-wild-ride/150619-joiner-shatner-tease_ixfuni',
    //     password: 'beammeupscotty',
    //     address: '2458 Linden Ave.',
    //     city: 'Chicago',
    //     state: 'IL',
    //     zip: '98765',
    //     personHours: -5
    //   }
    // ]).then(function () {
      // Request the route that returns all examples
      // request.get("/api/users").end(function (err, res) {
      //   var responseStatus = res.status;
      //   var responseBody = res.body;

        // Run assertions on the response

        // expect(err).to.be.null;

        // expect(responseStatus).to.equal(200);

        // expect(responseBody)
        //   .to.be.an("array")
        //   .that.has.lengthOf(4);

        // expect(responseBody[0])
        //   .to.be.an("object")
        //   .that.includes({
        //     firstName: 'Leonard',
        //     lastName: 'Nimoy',
        //     skill: 'Logic and Mind Melding',
        //     email: 'spock@vulcan.com',
        //     image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png',
        //     password: 'notlogicalcaptain',
        //     address: '314 Vulcan st.',
        //     city: 'Shi\'Kahr',
        //     state: 'HS',
        //     zip: '74358',
        //     personHours: 99
        //   });

        // expect(responseBody[1])
        //   .to.be.an("object")
        //   .that.includes({
        //     firstName: 'William',
        //     lastName: 'Shatner',
        //     skill: 'Captain',
        //     email: 'kirk@enterprise.com',
        //     image: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492180288/articles/2015/06/20/captain-kirk-s-new-wild-ride/150619-joiner-shatner-tease_ixfuni',
        //     password: 'beammeupscotty',
        //     address: '2458 Linden Ave.',
        //     city: 'Chicago',
        //     state: 'IL',
        //     zip: '98765',
        //     personHours: -5
        //   });

        // The `done` function is used to end any asynchronous tests
//         done();
//       });
//     });
//   });
// });