var db = require("../models"),
    express = require("express"),
    IMDB = require("../scrape"),
    router = express.Router();

// get route -> index
router.get("/api/gUser/:id", function(req, res) {
  //Check to see if user's google ID exists in db
  db.User.findOne({where:{googleID: req.params.id}}).then(
    user => {res.send(user);}
  )
});

router.post("/api/user", function(req, res) {
  IMDB.init(req.body.googleID, req.body.imdbID);
});

module.exports = router;


