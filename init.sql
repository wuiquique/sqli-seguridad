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
);

CREATE USER client WITH PASSWORD 'client';

GRANT CONNECT ON DATABASE sqli TO client;

GRANT SELECT ON TABLE public.users_seguro TO client;
