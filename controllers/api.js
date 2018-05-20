var db = require("../models"),
    express = require("express"),
    networkFunctions = require("./network"),
    cnstrctIMDB = require("../scrapeConstructor"),
    router = express.Router();

// get route -> index
router.get("/api/gUser/:id", function(req, res) {
  //Check to see if user's google ID exists in db
  db.User.findOne({where:{googleID: req.params.id}}).then(
    user => {res.send(user);}
  )
});

router.get("/api/user/profile/:id", function(req, res) {
  var user = {
    id:req.params.id,
  };

  //Get jobs

  //Get connections
  db.sequelize.query("SELECT COUNT(*) FROM imdme_db.jobs",
  { type: db.sequelize.QueryTypes.SELECT})
  .then(count => {
    console.log(count);
  });

  
});

router.post("/api/network", function(req, res) {
  networkFunctions.init(req.body.projects);
});

router.post("/api/user", function(req, res) {
  var imdb = new cnstrctIMDB();
      imdb.init(req.body.googleID, req.body.imdbID)
      .then(() => {
        /* networkFunctions.init(imdb.projects)
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
})
  //IMDB.init(req.body.googleID, req.body.imdbID);



module.exports = router;


