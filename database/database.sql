DROP DATABASE IF EXISTS jamusic;
CREATE DATABASE jamusic;
USE jamusic;
CREATE TABLE profile
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(32) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL
);
CREATE TABLE tag(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    instrument VARCHAR(50) NOT NULL,
    status VARCHAR(15) NOT NULL,
    style VARCHAR(50) NOT NULL
);
CREATE TABLE post(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text VARCHAR(400) NOT NULL,
    note INT NULL,
    share INT NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);
CREATE TABLE message
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);
CREATE TABLE account
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(100) NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);
