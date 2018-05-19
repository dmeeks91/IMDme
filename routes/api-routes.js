var db = require("../models");
var IMDB = require("../scrape")
const scrapeIt = require("scrape-it");

// Scrape a single IMDB page and return array of URLs https://www.imdb.com/name/nm2656455/
var movie_urls = [];
var people_urls = ["https://www.imdb.com/name/nm3053439/"];
module.exports = function(app) {
    
  function scrapeJobs(url) {
      scrapeIt(url, {
          projects: {
              listItem: ".filmo-row",
              data: {
                  title_url: {
                      selector: "b a",
                      attr: "href",
                  }
              }
          }
      }).then(function({ data, response }) {
          
          data.projects.map(function(job){
              job.title_cast_url = job.title_url.split("?");
              job.title_cast_url = job.title_cast_url[0];
              job.title_cast_url = `https://www.imdb.com${job.title_cast_url}fullcredits?ref_=tt_cl_sm#cast`
          })
          for (var i = 0; i < data.projects.length; i++) {
              if (movie_urls.indexOf(data.projects[i].title_cast_url) === -1) {
                  movie_urls.push(data.projects[i].title_cast_url);
              }
          }

          for (var i = 0; i < movie_urls.length; i++) {
                  scrapeCrew(movie_urls[i]);
              }
      });
  };

  function scrapeCrew(url) {
      scrapeIt(url, {
          users: {
              listItem: "#fullcredits_content .name",
              data: {
                  name_url: {
                      selector: "a",
                      attr: "href"
                  }
              }
          }
      }).then(function({ data, response }) {
          data.users.map(function(cast){
              cast.name_url = cast.name_url.split("?");
              cast.name_url = cast.name_url[0];
              cast.name_url = `https://www.imdb.com${cast.name_url}`;
          })
          for (var i = 0; i < data.users.length; i++) {
              if (people_urls.indexOf(data.users[i].name_url) === -1) {
                console.log(data.users[i].name_url);
                // This created a bunch of unhandled promise rejection errors
                // IMDB.init(data.users[i].name_url);
              }
          }
      });
  };
scrapeJobs(people_urls[0]);

}


// module.exports = function(app) {

//   IMDB.init("https://www.imdb.com/name/nm2656455/");

// }








