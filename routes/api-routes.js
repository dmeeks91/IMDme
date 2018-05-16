var db = require("../models");
var IMDB = require("../scrape")

module.exports = function(app) {
  IMDB.init("https://www.imdb.com/name/nm2656455/") 
  console.log(IMDB.roles)

  app.get("/api/jobs/makeup", function(req, res) {
    db.Job.findAll({
        where: { roleID: '2' }
    }).then(function(dbMakeup) {
        console.log(dbMakeup)
      res.json(dbMakeup);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
}


