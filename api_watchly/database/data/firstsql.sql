CREATE TABLE IF NOT EXISTS casting(
   cast_id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(50),
   surname VARCHAR(50),
   is_actor BOOLEAN
);

CREATE TABLE IF NOT EXISTS picture(
   picture_id INTEGER PRIMARY KEY AUTOINCREMENT,
   link VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS person(
   person_id INTEGER PRIMARY KEY AUTOINCREMENT,
   username VARCHAR(50),
   name VARCHAR(50),
   surname VARCHAR(50),
   is_admin BOOLEAN,
   mail VARCHAR(100),
   password VARCHAR(255),
   profile_picture TEXT DEFAULT 'assets/img/default-person.jpg'
);

CREATE TABLE IF NOT EXISTS genre(
   genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS shows(
   show_id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(50),
   description VARCHAR(500),
   released_date DATE,
   nationality VARCHAR(50),
   trailer_link VARCHAR(200),
   status VARCHAR(50),
   duration TIME,
   is_movie BOOLEAN,
   is_displayed BOOLEAN,
   rating TINYINT CHECK (rating BETWEEN 0 AND 10)
);

CREATE TABLE IF NOT EXISTS episode(
   episode_id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(100),
   description VARCHAR(500),
   duration TIME,
   show_id INT NOT NULL,
   season TINYINT,
   episode_number TINYINT,
   release_date DATE,
   FOREIGN KEY(show_id) REFERENCES shows(show_id)
);

CREATE TABLE IF NOT EXISTS favorite(
   show_id INT,
   person_id INT,
   rating TINYINT CHECK (rating BETWEEN 0 AND 10),
   is_watched BOOLEAN,
   PRIMARY KEY(show_id, person_id),
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);

CREATE TABLE IF NOT EXISTS play(
   play_id INTEGER PRIMARY KEY AUTOINCREMENT,
   cast_id INT,
   show_id INT,
   role VARCHAR(50),
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
   comment_id INTEGER  PRIMARY KEY AUTOINCREMENT,
   show_id INT NULL,
   episode_id INT NULL,
   person_id INT NOT NULL,
   comment_text VARCHAR(500),
   comment_date DATETIME,
   is_watched BOOLEAN,
   is_spoiler BOOLEAN,
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(episode_id) REFERENCES episode(episode_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);

CREATE TABLE IF NOT EXISTS illustrated(
   illustrated_id INTEGER PRIMARY KEY AUTOINCREMENT,
   show_id INT NULL,
   picture_id INT NULL,
   episode_id INT NULL,
   person_id INT NULL,
   FOREIGN KEY(show_id) REFERENCES shows(show_id),
   FOREIGN KEY(picture_id) REFERENCES picture(picture_id),
   FOREIGN KEY(episode_id) REFERENCES episode(episode_id),
   FOREIGN KEY(person_id) REFERENCES person(person_id)
);