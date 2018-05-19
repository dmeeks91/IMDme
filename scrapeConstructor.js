const scrapeIt = require("scrape-it")
var db = require("./models");

function IMDB ()
{
    this.cast = [];
    this.user = {};
    this.roles = [];
    this.projects = [];

    this.addNewUser = function() {
        var self = this;
        if (self.user.gID)
        {
           return db.User.findOrCreate({
                where:{
                    googleID: self.user.gID
                }, 
                defaults:{
                    imdbID: self.user.imdbID,
                    name: self.user.name
                }
            }) 
        }
        return db.User.findOrCreate({
            where:{
                imdbID: self.user.imdbID
            }, 
            defaults:{
                googleID: self.user.gID,
                name: self.user.name
            }
        })
    };
    this.getAllProjects = function() {
        var self = this,
            indx = 0;
        return new Promise ((resolve, reject) => {
            self.roles.forEach(function(role){                                
                self.scrapeThisProject(role.shortName).then(function({ data, response }){
                    indx ++;
                    data.projects.map(function(job){
                        //job.role = role.fullName;
                        //job.role_short = role.shortName;
                        job.title_id = job.title_url.split("/")[2];
                        job.title_cast_url = `https://www.imdb.com${job.title_url.split("?")[0]}fullcredits?ref_=tt_cl_sm#cast`
                        //job.user_id = self.user.imdbID;
                        self.projects.push(job);
                        db.Job.findOrCreate({where: {projectID: job.title_id, userID: self.user.imdbID},defaults:{roleID: role.shortName}});
                        db.Project.findOrCreate({where: {projectID: job.title_id},defaults:{name: job.title}});   
                    });                    
                    if (indx === self.roles.length) resolve(true);
                });    
            });
        });
    };
    this.getCast = function(url) {
        const self = this;
        //scrape cast and return as an array
        return new Promise(function(resolve, reject){            
            self.scrapeCast(url).then(function({ data, response }) {
                data.users.map(function(cast){
                    cast.name_id = cast.name_url.split("/")[2];
                    cast.name_url = `https://www.imdb.com${cast.name_url.split("?")[0]}`;
                })
                self.cast = data.users;
                resolve(self.cast);
            });
        })
    };
    this.getRoles = function() {
        var self = this;
        return new Promise ((resolve, reject) => {            
            self.scrapeRoles().then(function({ data, response }){
                //set user Name
                self.user.name = data.user[0].name;  
                //set roles and add to db
                self.setRoles(data.roles);
                //check if user is in DB to add or update user details
                self.userInDB()
                .then(user => {
                    var action = (user) ? "updateUser" : "addNewUser";
                    self[action]().then(() => {
                        self.getAllProjects().then(added => {
                            resolve(added);
                        });
                    });
                })         
            }); 
        })
            
    };
    this.init = function(gID, imdbID) {
        var self = this;
        return new Promise ((resolve, reject) => {
            self.user = {
                url: `https://www.imdb.com/name/${imdbID}/`,
                imdbID: (imdbID) ? imdbID : null,
                gID: (gID) ? gID : null 
            }
            self.getRoles().then(complete => {resolve(complete)});
        })
    };
    this.scrapeCast = function(url) {
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
    };
    this.scrapeRoles = function() {  
        return scrapeIt(this.user.url, {
            user: {
                listItem: "h1.header",
                data: {name: ".itemprop"}
            },
            roles: {
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
    };
    this.scrapeThisProject = function(type) {
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
    };
    this.setRoles = function(roleArry) {
        //set roles array
        this.roles = roleArry;
        //Add all roles from roles array to DB if they don't already exist
        this.roles.forEach(role => {
            db.Role.findOrCreate({
                where: {
                    short_name: role.shortName
                },
                defaults:{
                    name: role.fullName
                }
            });
        });        
    };
    this.updateUser = function(user) {
        var self = this,
        param = (self.user.gID) 
                ? {googleID: self.user.gID} 
                : {imdbID: self.user.imdbID};
        
        return db.User.update(self.user, {where:param});
    };
    this.userInDB = function() {
        var self = this,
            param = (self.user.gID) 
                    ? {googleID: self.user.gID} 
                    : {imdbID: self.user.imdbID};

        return db.User.findOne({where:param});
    }
}

module.exports = IMDB;