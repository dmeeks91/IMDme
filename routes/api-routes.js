var db = require("../models");
var IMDB = require("../scrape")

module.exports = function(app) {

  //IMDB.init("https://www.imdb.com/name/nm2656455/");

  IMDB.getCast("https://www.imdb.com/title/tt3590068/fullcredits?ref_=tt_cl_sm#cast")

}







