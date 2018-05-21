var cnstrctIMDB = require("../scrapeConstructor"),
    db = require("../models"),
    express = require("express"),
    Network = require("./network"),
    profile = require("./userProfile"),
    router = express.Router();

router.post("/api/imdb", function(req, res) {
  var imdb = new cnstrctIMDB();
      imdb.init(req.body.googleID, req.body.imdbID)
      .then(() => {
        res.send({projects: imdb.projects});
      });
});

//sync imdb planned to use put but Framework7 doesn't support put calls
router.post("/api/imdb/sync", function(req, res) {
  var imdb = new cnstrctIMDB();
  imdb.init(req.body.googleID, req.body.imdbID).then(() => res.send("updated"));
});
    
router.get("/api/gUser/:id", function(req, res) {
  //Check to see if user's google ID exists in db
  db.User.findOne({where:{googleID: req.params.id}}).then(
    user => {
      res.send((user) ? user.dataValues : null);
    }
  )
});

router.get("/api/user/profile/:id", function(req, res) {
  var user = {},
      imdb = new cnstrctIMDB();
  
  imdb.findUserInDB("googleID", req.params.id)
  .then(thisUser => {
    if (!thisUser) res.send(user);
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
});

router.post("/api/castList", function(req, res) {
  Network.thisCast(req.body.title_cast_url, req.body.title_id)
  .then(cast => {
    res.send(cast)
  });
})

router.post("/api/network/:id", function(req, res) {
  //Network.init(req.body.projects);
  var imdb = new cnstrctIMDB();
  imdb.init("", req.params.id);
  res.send(true);
  /* .then(() => {
    //res.send({projects: imdb.projects});
  }); */
});



module.exports = router;


