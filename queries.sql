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