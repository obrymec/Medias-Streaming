/*Users table creation*/
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR (16) NOT NULL,
    pseudo VARCHAR (32) NOT NULL,
    mail VARCHAR (128) NOT NULL
) Engine = InnoDB;

/*Cities table creation*/
CREATE TABLE Cities (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR (32) NOT NULL
) Engine = InnoDB;

/*Artists table creation*/
CREATE TABLE Artists (
    valid INTEGER DEFAULT 0 CHECK (valid >= 0 AND valid <= 1),
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    identite_card VARCHAR (256) NOT NULL,
    attestation VARCHAR (256) NOT NULL,
    producer VARCHAR (64) NOT NULL,
    profil VARCHAR (256) NOT NULL,
    phone INTEGER NOT NULL,
    id_user INTEGER,
    id_city INTEGER,
    FOREIGN KEY (id_city) REFERENCES Cities (id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users (id) ON DELETE CASCADE
) Engine = InnoDB;

/*Categories table creation*/
CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR (64) NOT NULL
) Engine = InnoDB;

/*Streams table creation*/
CREATE TABLE Streams (
    active INTEGER DEFAULT 0 CHECK (active >= 0 AND active <= 0),
    dislike INTEGER DEFAULT 0 CHECK (dislike >= 0),
    slike INTEGER DEFAULT 0 CHECK (slike >= 0),
    view INTEGER DEFAULT 0 CHECK (view >= 0),
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    cover VARCHAR (256) NOT NULL,
    title VARCHAR (256) NOT NULL,
    path VARCHAR (256) NOT NULL,
    hosted_date DATE NOT NULL,
    type VARCHAR (5) NOT NULL,
    description VARCHAR (256),
    id_category INTEGER,
    id_artist INTEGER,
    FOREIGN KEY (id_category) REFERENCES Categories (id) ON DELETE CASCADE,
    FOREIGN KEY (id_artist) REFERENCES Artists (id) ON DELETE CASCADE
) Engine = InnoDB;

/*Reactions table creation*/
CREATE TABLE Reactions (
    type INTEGER DEFAULT -1 CHECK (type >= -1 AND type <= 1),
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_stream INTEGER,
    id_user INTEGER,
    FOREIGN KEY (id_stream) REFERENCES Streams (id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users (id) ON DELETE CASCADE
) Engine = InnoDB;
