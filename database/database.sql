CREATE DATABASE typescriptdatabase;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    Nombre VARCHAR(40),
    email TEXT
);

INSERT INTO users (Nombre, email)
    VALUES('joe', 'joe@ibm.com'),
        ('ryan', 'ryan@ibm.com');