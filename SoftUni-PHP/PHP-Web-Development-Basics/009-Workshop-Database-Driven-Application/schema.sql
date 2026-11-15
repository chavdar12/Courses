CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roles
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO roles (name)
VALUES ('USER'),
       ('ADMIN');

CREATE TABLE IF NOT EXISTS users_roles
(
    user_id INTEGER NOT NULL REFERENCES users (id),
    role_id INTEGER NOT NULL REFERENCES roles (id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS authentications
(
    auth_string TEXT PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS categories
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO categories (name)
VALUES ('Programming'),
       ('Databases'),
       ('Chat'),
       ('Education');

CREATE TABLE IF NOT EXISTS questions
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    body        TEXT    NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories (id),
    author_id   INTEGER NOT NULL REFERENCES users (id),
    created_on  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answers
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    body        TEXT    NOT NULL,
    author_id   INTEGER NOT NULL REFERENCES users (id),
    question_id INTEGER NOT NULL REFERENCES questions (id),
    created_on  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS questions_tags
(
    question_id INTEGER NOT NULL REFERENCES questions (id),
    tag_id      INTEGER NOT NULL REFERENCES tags (id),
    PRIMARY KEY (question_id, tag_id)
);

CREATE TABLE IF NOT EXISTS user_likes
(
    user_id     INTEGER NOT NULL REFERENCES users (id),
    question_id INTEGER NOT NULL REFERENCES questions (id),
    PRIMARY KEY (user_id, question_id)
);
