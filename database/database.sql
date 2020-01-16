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


                    CREATE TABLE profile_has_profile
(
    profile_ID INT NOT NULL,
    profile2_ID INT NOT NULL,
    CONSTRAINT PK_profile_has_profile PRIMARY KEY
    (
        profile_id,
        profile_id
    ),
    FOREIGN KEY (profile_has_profile)
)

                    (
    StudentID int NOT NULL,
    ClassroomID int NOT NULL,
    CONSTRAINT PK_StudentClassroom PRIMARY KEY
                    (
        StudentID,
        ClassroomID
    ),
    FOREIGN KEY
                    (StudentID) REFERENCES Students
                    (StudentID),
    FOREIGN KEY
                    (ClassroomID) REFERENCES Classrooms
                    (ClassroomID)
)