CREATE TABLE casting(
   Cast_id INT,
   name VARCHAR(50),
   surname VARCHAR(50),
   is_actor BOOLEAN,
   PRIMARY KEY(Cast_id)
);

CREATE TABLE picture(
   picture_id INT,
   link VARCHAR(100),
   PRIMARY KEY(picture_id)
);

CREATE TABLE person(
   person_id INT,
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

CREATE TABLE genre(
   Genre_id INT,
   name VARCHAR(50),
   PRIMARY KEY(Genre_id)
);

CREATE TABLE shows(
   serie_id INT,
   name VARCHAR(50),
   description VARCHAR(500),
   released_date DATE,
   nationality VARCHAR(50),
   trailer_link VARCHAR(200),
   status VARCHAR(50),
   duration TIME,
   is_movie BOOLEAN,
   rating INT,
   picture_id INT NOT NULL,
   PRIMARY KEY(serie_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id)
);

CREATE TABLE episode(
   episode_id INT,
   name VARCHAR(100),
   description VARCHAR(500),
   duration TIME,
   picture_id INT NOT NULL,
   serie_id INT NOT NULL,
   PRIMARY KEY(episode_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id),
   FOREIGN KEY(serie_id) REFERENCES shows(serie_id)
);

CREATE TABLE favorite(
   serie_id INT,
   person_id INT,
   rating INT,
   is_watched BOOLEAN,
   PRIMARY KEY(serie_id, person_id),
   FOREIGN KEY(serie_id) REFERENCES shows(serie_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);

CREATE TABLE play(
   Cast_id INT,
   serie_id INT,
   play_id VARCHAR(50),
   role VARCHAR(50),
   PRIMARY KEY(Cast_id, serie_id),
   FOREIGN KEY(Cast_id) REFERENCES casting(Cast_id),
   FOREIGN KEY(serie_id) REFERENCES shows(serie_id)
);

CREATE TABLE has(
   serie_id INT,
   Genre_id INT,
   PRIMARY KEY(serie_id, Genre_id),
   FOREIGN KEY(serie_id) REFERENCES shows(serie_id),
   FOREIGN KEY(Genre_id) REFERENCES genre(Genre_id)
);

CREATE TABLE comments(
   episode_id INT,
   person_id INT,
   comment_id INT NOT NULL,
   comment_text VARCHAR(500),
   comment_date DATETIME,
   is_watched BOOLEAN,
   PRIMARY KEY(episode_id, person_id),
   UNIQUE(comment_id),
   FOREIGN KEY(episode_id) REFERENCES episode(episode_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);