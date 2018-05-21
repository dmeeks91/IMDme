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
        var self = this,
            indx = 0;

        return new Promise ((resolve, reject) => {
            projects.forEach(project => {
                self.thisCast(project.title_cast_url)
                .then(result => {
                    indx ++;
                    if (indx === projects.length) {
                        resolve(self.castList);
                    };
                })
            })
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
                /* self.addCastToDb(cast)
                .then(
                    () => resolve(true)
                ); */
            })
        });
    },
    thisCast: function(projectUrl){
        var self = this;
            //obj = new cnstrctIMDB();
        
        return new Promise((resolve, reject) => {
            var obj = new cnstrctIMDB();
            obj.getCast(projectUrl)
            .then((cast) => {
                //only add to cast if distinct
                cast.forEach(person => {
                    if (!self.castList.find(existing => person.id === existing.id))
                    {
                        self.castList.push(person);
                    }
                });
                resolve(true);
            });
        })            
    },
    getUserImdbId: function(gID){
        return db.User.findOne("where")
    }
}

module.exports = network;