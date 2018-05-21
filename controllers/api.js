var cnstrctIMDB = require("../scrapeConstructor"),
    db = require("../models"),
    express = require("express"),
    Network = require("./network"),
    profile = require("./userProfile"),
    router = express.Router();

// get route -> index
router.get("/api/gUser/:id", function(req, res) {
  //Check to see if user's google ID exists in db
  db.User.findOne({where:{googleID: req.params.id}}).then(
    user => {
      res.send(user.dataValues);
    }
  )
});

router.get("/api/user/profile/:id", function(req, res) {
  var user = {},
      imdb = new cnstrctIMDB();
  
  imdb.findUserInDB("googleID", req.params.id)
  .then(thisUser => {
    user = thisUser.dataValues;
    profile.getJobs(user.imdbID)
    .then(jobCount => {
      user.jobs = jobCount;
      profile.getConnections(user.imdbID)
      .then(connections => {
        user.connections = connections;
        profile.getRoles(user.imdbID)
        .then(roles => {
          user.roles = roles;
          profile.getD3Nodes(user.imdbID)
          .then(nodes => {
            user.nodes = nodes;
            profile.getD3Links(user.imdbID)
            .then(links => {
              user.links = links;
              res.send(user);
            })
          })
        })
      })
    }
    );
  })

  //Get jobs
  /* db.sequelize.query(`SELECT COUNT(DISTINCT projectID) jobs 
                      FROM Jobs WHERE userID = '${user.id}';`,
                      {type: db.sequelize.QueryTypes.SELECT})
              .then(jobs => {
                user.jobs = jobs.count;
              }); */
  //Get connections

  //Get roles
 /*  db.sequelize.query("SELECT COUNT(*) FROM imdme_db.jobs",
  { type: db.sequelize.QueryTypes.SELECT})
  .then(count => {
    console.log(count);
  }); */

  
});

router.post("/api/network", function(req, res) {
  Network.init(req.body.projects);
});

router.post("/api/imdb", function(req, res) {
  var imdb = new cnstrctIMDB();
      imdb.init(req.body.googleID, req.body.imdbID)
      .then(() => {
        /* Network.init(imdb.projects)
        .then(() => {
          console.log("Added to Database")}
          (castlist) => {
            console.log(castlist);
             castlist.forEach(person => {
              //console.log(person);
              var user = new cnstrctIMDB();
              user.init(null, person.id); 
            });
        ); */ 
        res.send({profile: imdb.user, projects: imdb.projects});
      });
});

//sync imdb
router.put("/api/imdb/sync", function(req, res) {
  Network.imdb(req.body.googleID, req.body.imdbID)
  .then()
  var imdb = new cnstrctIMDB();
      imdb.init(req.body.googleID, req.body.imdbID)
      .then(() => { 
        res.send({profile: imdb.user, projects: imdb.projects});
      });
});


module.exports = router;


