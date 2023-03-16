CREATE TABLE users(
    user_id 	Serial PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email	VARCHAR (50) NOT NULL UNIQUE,
	salt    Text NOT NULL ,
    password	Text NOT NULL ,
    image	bytea[],
    address		VARCHAR(200),
    phone_number  Numeric (10,0) NOT NULL UNIQUE,
    address_image bytea[],
    tokens VARCHAR
);

