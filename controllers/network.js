var cnstrctIMDB = require("../scrapeConstructor"),
    db = require("../models");

network = {
    castList: [],
    addCastToDb: function(cast) {
        return new Promise ((resolve, reject) => {
            cast.forEach(user => {
                //add user to users table
                db.User.findOrCreate({where:{imdbID: user.id},defaults:{name: user.name}})
                .then(() => {
                    //add job to jobs table 
                    //at this point we do not know the role of the user
                    db.Job.findOrCreate({where: {projectID: user.pID,userID: user.id}})
                    .then(() => {
                        resolve(true);
                    })
                })
            });
        });
    },
    getAll: function(projects) {
        var self = this;
        return new Promise ((resolve, reject) => {
            /* projects.forEach(project => {
                self.thisCast(project.title_cast_url, project.title_id)
                .then(result => {
                    if(self.castList.length >= 100)
                    {
                        resolve(self.castList);
                    }
                    else
                    {
                        indx ++;
                    }
                    
                    if (indx === projects.length) {
                        resolve(self.castList);
                    };
                })
            }) */
        })
    },
    imdb: function(gID, imdbID) {
        var imdb = new cnstrctIMDB();
        return imdb.init(gID, imdbID);
    },
    init: function(projects) {
        var self = this; 

        return new Promise((resolve, reject) => {
            self.getAll(projects)
            .then(cast => {
                resolve(self.castList);
            })
        });
    },
    thisCast: function(projectUrl, pID){
        var self = this
            obj = new cnstrctIMDB();        
        return new Promise((resolve, reject) => {
            obj.getCast(projectUrl, pID)
            .then((cast) => {
                //only add to cast if distinct
                cast.forEach(person => {
                    if (!self.castList.find(existing => person.id === existing.id))
                    {
                        self.castList.push(person);
                        //if(self.castList.length >= 100) resolve(true);
                    }
                });
                resolve(self.castList);
            });
        })            
    }
}

module.exports = network;