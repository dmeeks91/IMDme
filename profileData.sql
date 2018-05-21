 -- GET Jobs
SELECT COUNT(DISTINCT projectID) jobs FROM Jobs WHERE userID = 'nm3053439';

 -- GET Connections
SELECT COUNT(DISTINCT a.userID) AS 'connections'
FROM Jobs a
	INNER JOIN (SELECT DISTINCT projectID FROM Jobs WHERE userID = 'nm3053439') p on a.projectID=p.projectID;
  
 -- GET Roles
SELECT u.userID, COUNT(DISTINCT u.projectID) count_, CONCAT(r.name,' (', COUNT(DISTINCT u.projectID),')') jobs
FROM Jobs u
    INNER JOIN Roles r on u.roleID = r.short_name
WHERE u.userID = 'nm3053439'
GROUP BY u.userID, r.name
ORDER BY count_ DESC;
 
 -- Nodes for d3.js
SELECT DISTINCT u1.name AS 'id', r1.name AS 'group'
FROM Jobs a
	INNER JOIN (select distinct projectID FROM Jobs WHERE userID = 'nm3053439') p on a.projectID=p.projectid
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
    LEFT JOIN Roles r1 on b.roleID = r1.short_name;
 
 -- Links for d3.js
SELECT u1.name AS 'source', u2.name AS 'target', COUNT(DISTINCT a.projectID) AS 'value'
FROM Jobs a
	INNER JOIN (select distinct projectID FROM Jobs WHERE userID = 'nm3053439') p on a.projectID=p.projectid
	INNER JOIN Jobs b on a.projectID=b.projectID and a.userID <> b.userID
    LEFT JOIN Users u1 on a.userID = u1.imdbID
    LEFT JOIN Users u2 on b.userID = u2.imdbID
GROUP BY u1.name, u2.name
ORDER BY value DESC
LIMIT 200;
 