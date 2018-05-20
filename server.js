var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
//allows us to serve up pages using Framework7 routing API
app.use(express.static("www")); 

var db = require("./models");

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

var routes = require("./controllers/api");

app.use(routes);

 var IMDBconstruct = require("./scrapeConstructor");

  var imdb = new IMDBconstruct();
  //imdb.init("","nm0004898");
  //imdb.init("","nm7458565");
  //imdb.init("","nm0005125");
 
/*IMDB.getCast("https://www.imdb.com/title/tt3590068/fullcredits?ref_=tt_cl_sm#cast"); */

