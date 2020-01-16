DROP DATABASE IF EXISTS jamusic;

CREATE DATABASE jamusic;

USE jamusic;

CREATE TABLE account (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR (320) NOT NULL,
    password VARCHAR (100) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE profile (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    picture VARCHAR (400) NULL,
    nickname VARCHAR (32) NOT NULL,
    biography VARCHAR (400) NULL,
    ville VARCHAR (200) NULL,
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE tag (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    category VARCHAR (15) NOT NULL
);

CREATE TABLE post (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text VARCHAR (400) NOT NULL,
    media VARCHAR (400) NULL,
    likes INT NULL,
    share INT NOT NULL,
    date TIMESTAMP NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profile (id)
);

CREATE TABLE message (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text VARCHAR (1000) NOT NULL,
    profile_id INT,
    FOREIGN KEY (profile_id) REFERENCES profile (id)
);

CREATE TABLE profile_has_profile (
    profile_id INT NOT NULL,
    profile2_id INT NOT NULL,
    CONSTRAINT PK_profile_has_profile PRIMARY KEY (profile_id),
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (profile2_id) REFERENCES profile(id)
);

CREATE TABLE profile_has_tag (
    profile_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT PK_profile_has_tag PRIMARY KEY (profile_id, tag_id),
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE post_has_tag (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT PK_post_has_tag PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES post(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE profile_has_message (
    profile_id INT NOT NULL,
    message_id INT NOT NULL,
    CONSTRAINT PK_profile_has_message PRIMARY KEY (profile_id, message_id),
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (message_id) REFERENCES message(id)
);