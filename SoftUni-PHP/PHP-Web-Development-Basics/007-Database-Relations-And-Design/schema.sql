CREATE TABLE IF NOT EXISTS countries
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL UNIQUE,
    capital    TEXT    NOT NULL,
    population INTEGER NOT NULL
);

INSERT OR IGNORE INTO countries (name, capital, population)
VALUES ('Bulgaria', 'Sofia', 6447710),
       ('Greece', 'Athens', 10432481),
       ('Romania', 'Bucharest', 19053815);

CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
