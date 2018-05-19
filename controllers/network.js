var cnstrctIMDB = require("../scrapeConstructor");

network = {
    castList: [],
    getAll: function(projects) {
        var self = this,
            indx = 0;

        return new Promise ((resolve, reject) => {
            projects.forEach(project => {
                self.thisCast(project.title_cast_url)
                .then(result => {
                    indx ++;
                    if (indx === projects.length) resolve(self.castList);
                })
            })
        })
    },
    thisCast: function(projectUrl){
        var self = this,
            obj = new cnstrctIMDB();
        
        return new Promise((resolve, reject) => {
            obj.getCast(projectUrl)
            .then((cast) => {
                cast.forEach(person => {
                    if (!self.castList.find(existing => person.name_id === existing.name_id))
                    {
                        self.castList.push(person);
                    }
                });
                resolve(true);
            });
        })            
    }
}

module.exports = network;