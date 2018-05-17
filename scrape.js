const scrapeIt = require("scrape-it")
var db = require("./models");

var IMDB = {
    cast: [],
    user: {},
    roles: [],
    projects: [],
    getAllProjects: function() {
        var self = this,
            indx = 0;
        self.roles.forEach(function(role){
            self.scrapeThisProject(role.shortName).then(function({ data, response }){
                indx++;
                data.projects.map(function(job){
                    job.role = role.fullName;
                    job.role_short = role.shortName;
                    job.title_id = job.title_url.split("/");
                    job.title_id = job.title_id[2];
                    job.title_cast_url = job.title_url.split("?");
                    job.title_cast_url = job.title_cast_url[0];
                    job.title_cast_url = `https://www.imdb.com${job.title_cast_url}fullcredits?ref_=tt_cl_sm#cast`
                    job.user_id = self.user.id;
                    // self.projects.push(job);
                    db.User.create({
                        userID: job.user_id,
                        name: "Pete",
                        });
                      db.Job.create({
                        userID: job.user_id,
                        roleID: job.role_short,
                        projectID: job.title_id
                      });
                      db.Project.create({
                        name: job.title,
                        projectID: job.title_id
                      })
                      db.Role.create({
                        name: job.role
                      })
                })
                if (self.roles.length === indx) 
                {
                    console.log("User Portfolio");
                    console.log(IMDB.projects);
                }
            });    
        });
        
    },
    getCast: function(url) {
        const self = this;
        self.scrapeCast(url).then(function({ data, response }) {
            data.users.map(function(cast){
                cast.name_id = cast.name_url.split("/");
                cast.name_id = cast.name_id[2];
                cast.name_url = cast.name_url.split("?");
                cast.name_url = cast.name_url[0];
                cast.name_url = `https://www.imdb.com${cast.name_url}`;
            })
            self.cast = data.users;
            // console.log("Film Cast");
            // console.log(self.cast);
        });
    },
    getRoles: function() {
        var self = this;
        self.scrapeRoles().then(function({ data, response }){
            self.roles = data.Roles;
            self.getAllProjects();
        }); 
            
    },
    init: function(url) {
        this.user = {
            url: url,
            id: url.substring(url.indexOf("/name/"), url.lastIndexOf("/")).replace("/name/",""),
        };
        this.getRoles();
    },
    scrapeCast: function(url) {
        return scrapeIt(url, {
            users: {
                listItem: "#fullcredits_content .name",
                data: {
                    name: "a",
                    name_url: {
                        selector: "a",
                        attr: "href"
                    }
                }
            }
        })
    },
    scrapeRoles: function() {  
        return scrapeIt(this.user.url, {
            Roles: {
                listItem: "#filmography .head",
                data: {
                    fullName: "a",
                    shortName: {
                        selector: "a",
                        attr: "name"
                    }
                }
            } 
        });
    },
    scrapeThisProject: function(type) {
        const listVal = `#filmo-head-${type} + .filmo-category-section .filmo-row`;
        return scrapeIt(this.user.url, {
            projects: {
                listItem: listVal,
                data: {
                    title: "b a",
                    title_url: {
                        selector: "b a",
                        attr: "href",
                    },
                    year: ".year_column"
                }
            },
        });
        return IMDB
    }
}

module.exports = IMDB

//Get User and all projects 

//Get all Cast Memebers
// IMDB.getCast("https://www.imdb.com/title/tt3590068/fullcredits?ref_=tt_cl_sm#cast");