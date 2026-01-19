CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
first_name TEXT,
last_name TEXT,
email TEXT UNIQUE NOT NULL,
username TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);