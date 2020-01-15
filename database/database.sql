DROP DATABASE IF EXISTS jamusic;
CREATE DATABASE jamusic;
USE jamusic;

CREATE TABLE account
(
    id INT PRIMARY KEY NOT NULL
    AUTO_INCREMENT,
    email VARCHAR
    (320) NOT NULL,
    password VARCHAR
    (100) NOT NULL,
    date TIMESTAMP NOT NULL
);

    CREATE TABLE profile
    (
        id INT PRIMARY KEY NOT NULL
        AUTO_INCREMENT,
    picture VARBINARY NULL, -- VERIFIER LA DOC DE VARBINARY
    nickname VARCHAR
        (32) NOT NULL,
    biography VARCHAR
        (400) NULL,
    ville VARCHAR
        (200) NULL,
    account_id INT,
    FOREIGN KEY
        (account_id) REFERENCES account
        (id)
);
        CREATE TABLE tag
        (
            id INT PRIMARY KEY NOT NULL
            AUTO_INCREMENT,
    name VARCHAR
            (50) NOT NULL,
    category VARCHAR
            (15) NOT NULL
);
            CREATE TABLE post
            (
                id INT PRIMARY KEY NOT NULL
                AUTO_INCREMENT,
    text VARCHAR
                (400) NOT NULL,
    likes INT NULL,
    share INT NOT NULL,
    date TIMESTAMP NOT NULL,
    profile_id INT,
    FOREIGN KEY
                (profile_id) REFERENCES profile
                (id)
);
                CREATE TABLE message
                (
                    id INT PRIMARY KEY NOT NULL
                    AUTO_INCREMENT,
    text VARCHAR
                    (1000) NOT NULL,
    profile_id INT,
    FOREIGN KEY
                    (profile_id) REFERENCES profile
                    (id)
);
