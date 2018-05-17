var db = require("../models");
var IMDB = require("../scrape")

module.exports = function(app) {

  IMDB.init("https://www.imdb.com/name/nm2656455/");

}








