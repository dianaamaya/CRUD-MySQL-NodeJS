CREATE DATABASE database_links;

USE database_links;

-- Users table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- Type table
CREATE TABLE types(
    id INT(11) NOT NULL,
    type VARCHAR(16) NOT NULL
);

ALTER TABLE types
    ADD PRIMARY KEY (id);

ALTER TABLE types
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE types;

-- Links table
CREATE TABLE links(
    id INT(11) NOT NULL, 
    title VARCHAR(150) NOT NULL,
    description VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    user_id INT(11),
    type_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_type FOREIGN KEY (type_id) REFERENCES types(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

 INSERT INTO types (type) 
 VALUES ("to study");

  INSERT INTO types (type) 
 VALUES ("to play");

  INSERT INTO types (type) 
 VALUES ("to cook");

  INSERT INTO types (type) 
 VALUES ("to read");
