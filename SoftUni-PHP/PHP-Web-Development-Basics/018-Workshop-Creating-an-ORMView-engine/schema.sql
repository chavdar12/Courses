CREATE TABLE IF NOT EXISTS users
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    first_name TEXT NULL,
    last_name  TEXT NULL,
    born_on    TEXT NULL
);
