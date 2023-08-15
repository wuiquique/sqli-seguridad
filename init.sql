CREATE TABLE users_inseguro (
  id serial PRIMARY KEY,
  username VARCHAR (100) NOT NULL,
  email VARCHAR (100) NOT NULL,
  password VARCHAR (100) NOT NULL
);

CREATE TABLE users_seguro (
    id serial PRIMARY KEY,
    username VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL
)