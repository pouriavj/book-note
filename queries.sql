CREATE TABLE register(
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL CHECK (length(btrim(username)) > 0),
	password VARCHAR(15) NOT NULL CHECK (length(btrim(password)) > 0)
);

CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	title VARCHAR(80) UNIQUE NOT NULL CHECK (length(btrim(title)) > 0),
	author VARCHAR(50) NOT NULL CHECK (length(btrim(author)) > 0),
	notes TEXT NOT NULL CHECK (length(btrim(notes)) > 0),
	rating TEXT NOT NULL,
	cover TEXT,
	user_id INT NOT NULL
);
--Do these alters inside the CREATE--
ALTER TABLE posts
ADD created_at TEXT

ALTER TABLE posts
ADD UNIQUE (title, author, user_id)

ALTER TABLE posts
ADD FOREIGN KEY (user_id) REFERENCES register(id);

ALTER TABLE posts DROP CONSTRAINT posts_title_key;
