var db = require("../models");
var IMDB = require("../scrape")
const scrapeIt = require("scrape-it");

profile = {
    getJobs: function(id) {
        var self = this;
        return new Promise ((resolve, reject) => {
            self.querySql(self.getSqlString("jobs", id))
            .then(rows => {
                resolve(rows[0].jobs);
            });
        });
    },
    getConnections: function(id) {
        var self = this;
        return new Promise ((resolve, reject) => {
            self.querySql(self.getSqlString("connects", id)).then(rows => {
                resolve(rows[0].connections);
            })
        })
    },
    getD3Nodes: function(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.querySql(self.getSqlString("d3Nodes",id))
            .then(rows => {
                resolve(rows);
            });
        })
    },
    getD3Links: function(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.querySql(self.getSqlString("d3Links",id))
            .then(rows => {
                resolve(rows);
            });
        })
    },
    getRoles: function(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.querySql(self.getSqlString("roles",id))
            .then(rows => {
                resolve(rows);
            });
        })
    },
    getSqlString: function(type, id) {
        var sql = "";
        switch (type)
        {
            case "connects":
                sql = `SELECT COUNT(DISTINCT a.userID) AS 'connections'FROM Jobs a
                    INNER JOIN (SELECT DISTINCT projectID FROM Jobs WHERE 
                    userID = '${id}') p on a.projectID=p.projectID;`;
                break; 
            case "d3Nodes":
                sql = `SELECT DISTINCT u1.name AS 'id', r1.name AS 'group'
                       FROM Jobs a
                            INNER JOIN (select distinct projectID FROM Jobs WHERE userID = '${id}') p on a.projectID=p.projectid
                            INNER JOIN (
                                SELECT a.userID, a.roleID, MAX(projects) max_projects
                                FROM (
                                    SELECT userID, roleID, COUNT(distinct projectID) projects
                                    FROM Jobs
                                    GROUP BY userID, roleID
                                 ) a
                                 GROUP BY a.userID
                            ) b ON a.userID = b.userID
                            LEFT JOIN Users u1 on a.userID = u1.imdbID
                            LEFT JOIN Roles r1 on b.roleID = r1.short_name;`;
                break;
            case "d3Links":
                sql = `SELECT u1.name AS 'source', u2.name AS 'target', COUNT(DISTINCT a.projectID) AS 'value'
                    FROM Jobs a
                        INNER JOIN (select distinct projectID FROM Jobs WHERE userID = '${id}') p on a.projectID=p.projectid
                        INNER JOIN Jobs b on a.projectID=b.projectID and a.userID <> b.userID
                        LEFT JOIN Users u1 on a.userID = u1.imdbID
                        LEFT JOIN Users u2 on b.userID = u2.imdbID
                    GROUP BY u1.name, u2.name
                    ORDER BY value DESC
                    LIMIT 200;`;
                break;
            case "jobs":
                sql = `SELECT COUNT(DISTINCT projectID) jobs FROM Jobs WHERE userID = '${id}';`;
                break;  
            case "roles":
                sql =`SELECT u.userID, COUNT(DISTINCT u.projectID) count_, CONCAT(r.name,' (', COUNT(DISTINCT u.projectID),')') jobs
                FROM Jobs u
                    INNER JOIN Roles r on u.roleID = r.short_name
                WHERE u.userID = '${id}'
                GROUP BY u.userID, r.name
                ORDER BY count_ DESC;`
            break;
        }
        return sql;
    },
    querySql: function(sql) {
        var self = this;
        return db.sequelize.query(sql, {type: db.sequelize.QueryTypes.SELECT})
    }
}

module.exports = profile;