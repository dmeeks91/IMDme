-- DUMMY DATA FOR TESTING --

-- REAL DATA WILL COME FROM USING SCRAPE-IT ON IMDB -- 

USE imdme_db;

-- Michael Douglas - Actor - The Game --

INSERT INTO users (userID, name)
VALUES ("nm0000140", "Michael Douglas");

INSERT INTO roles (name)
VALUES ("Actor");

INSERT INTO projects (projectID, name)
VALUES ("tt0119174", "The Game");

INSERT INTO jobs (userID, roleID, projectID)
VALUES ("nm0000140", "1", "tt0119174");

-- Katie Middleton - Makeup - Ithaca --

INSERT INTO users (userID, name)
VALUES ("nm2656455", "Katie Middleton");

INSERT INTO roles (name)
VALUES ("Makeup");

INSERT INTO projects (projectID, name)
VALUES ("tt3501590", "Ithaca");

INSERT INTO jobs (userID, roleID, projectID)
VALUES ("nm2656455", "2", "tt3501590");

-- Meg Ryan - Actor - Ithaca -- 

INSERT INTO users (userID, name)
VALUES ("nm0000212", "Meg Ryan");

INSERT INTO jobs (userID, roleID, projectID)
VALUES ("nm0000212", "1", "tt3501590");

-- Bridget Bergman - Makeup - The Game -- 

INSERT INTO users (userID, name)
VALUES ("nm0074749", "Bridget Bergman");

INSERT INTO jobs (userID, roleID, projectID)
VALUES ("nm0074749", "2", "tt0119174");





