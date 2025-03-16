CREATE TABLE IF NOT EXISTS casting(
   cast_id INT auto_increment NOT NULL,
   name VARCHAR(50),
   surname VARCHAR(50),
   is_actor BOOLEAN,
   PRIMARY KEY(cast_id)
);

CREATE TABLE IF NOT EXISTS picture(
   picture_id INT auto_increment NOT NULL,
   link VARCHAR(100),
   PRIMARY KEY(picture_id)
);

CREATE TABLE IF NOT EXISTS person(
   person_id INT auto_increment NOT NULL,
   username VARCHAR(50),
   name VARCHAR(50),
   surname VARCHAR(50),
   is_admin BOOLEAN,
   mail VARCHAR(100),
   password VARCHAR(50),
   picture_id INT NOT NULL,
   PRIMARY KEY(person_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id)
);

CREATE TABLE IF NOT EXISTS genre(
   genre_id INT auto_increment NOT NULL,
   name VARCHAR(50),
   PRIMARY KEY(genre_id)
);

CREATE TABLE IF NOT EXISTS shows(
   show_id INT auto_increment NOT NULL,
   name VARCHAR(50),
   description VARCHAR(500),
   released_date DATE,
   nationality VARCHAR(50),
   trailer_link VARCHAR(200),
   status VARCHAR(50),
   duration TIME,
   is_movie BOOLEAN,
   rating TINYINT CHECK (rating BETWEEN 0 AND 10),
   picture_id INT NOT NULL,
   PRIMARY KEY(show_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id)
);

CREATE TABLE IF NOT EXISTS episode(
   episode_id INT auto_increment NOT NULL,
   name VARCHAR(100),
   description VARCHAR(500),
   duration TIME,
   picture_id INT NOT NULL,
   show_id INT NOT NULL,
   PRIMARY KEY(episode_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id)
);

CREATE TABLE IF NOT EXISTS favorite(
   show_id INT,
   person_id INT,
   rating TINYINT,
   is_watched BOOLEAN,
   PRIMARY KEY(show_id, person_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);

CREATE TABLE IF NOT EXISTS play(
   play_id INT auto_increment NOT NULL,
   cast_id INT,
   show_id INT,
   role VARCHAR(50),
   PRIMARY KEY(play_id),
   FOREIGN KEY(cast_id) REFERENCES casting(cast_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id)
);

CREATE TABLE IF NOT EXISTS has(
   show_id INT,
   genre_id INT,
   PRIMARY KEY(show_id, genre_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE IF NOT EXISTS comments(
   comment_id INT  auto_increment NOT NULL,
   show_id INT NULL,
   episode_id INT NULL,
   person_id INT NOT NULL,
   comment_text VARCHAR(500),
   comment_date DATETIME,
   is_watched BOOLEAN,
   is_spoiler BOOLEAN,
   PRIMARY KEY(comment_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(episode_id) REFERENCES episode(episode_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);