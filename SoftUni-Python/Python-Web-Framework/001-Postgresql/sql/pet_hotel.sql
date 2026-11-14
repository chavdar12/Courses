-- Lab: PostgreSQL - Pet Hotel
-- Run with: psql -U postgres -c 'CREATE DATABASE pet_hotel' && psql -U postgres -d pet_hotel -f sql/pet_hotel.sql

CREATE TABLE pet_owners (
    owner_id   SERIAL PRIMARY KEY,
    owner_name VARCHAR(15) NOT NULL,
    owner_age  INTEGER     NOT NULL CHECK (owner_age BETWEEN 1 AND 110)
);

CREATE TABLE dogs (
    dog_id   SERIAL PRIMARY KEY,
    owner_id INTEGER     NOT NULL REFERENCES pet_owners (owner_id) ON DELETE CASCADE,
    dog_name VARCHAR(15) NOT NULL,
    dog_age  INTEGER     NOT NULL CHECK (dog_age BETWEEN 1 AND 25)
);

CREATE TABLE cats (
    cat_id   SERIAL PRIMARY KEY,
    owner_id INTEGER     NOT NULL REFERENCES pet_owners (owner_id) ON DELETE CASCADE,
    cat_name VARCHAR(15) NOT NULL,
    cat_age  INTEGER     NOT NULL CHECK (cat_age BETWEEN 1 AND 25)
);

CREATE TABLE hotels (
    hotel_id    SERIAL PRIMARY KEY,
    hotel_name  VARCHAR(25) NOT NULL,
    hotel_stars INTEGER     NOT NULL CHECK (hotel_stars BETWEEN 1 AND 5)
);

CREATE TABLE dog_rooms (
    room_id         SERIAL PRIMARY KEY,
    dog_id          INTEGER NOT NULL REFERENCES dogs (dog_id) ON DELETE CASCADE,
    hotel_id        INTEGER NOT NULL REFERENCES hotels (hotel_id) ON DELETE CASCADE,
    register_date   DATE    NOT NULL,
    unregister_date DATE    NOT NULL
);

CREATE TABLE cat_rooms (
    room_id         SERIAL PRIMARY KEY,
    cat_id          INTEGER NOT NULL REFERENCES cats (cat_id) ON DELETE CASCADE,
    hotel_id        INTEGER NOT NULL REFERENCES hotels (hotel_id) ON DELETE CASCADE,
    register_date   DATE    NOT NULL,
    unregister_date DATE    NOT NULL
);

-- 1. Insert
INSERT INTO pet_owners (owner_name, owner_age)
VALUES ('Peter', 26), ('George', 32), ('Amy', 67);

INSERT INTO dogs (owner_id, dog_name, dog_age)
VALUES (1, 'Fluffy', 2), (3, 'Bully', 3), (1, 'Rousey', 5);

INSERT INTO cats (owner_id, cat_name, cat_age)
VALUES (2, 'Tommy', 1), (3, 'Jessy', 7), (2, 'Bubbles', 3);

INSERT INTO hotels (hotel_name, hotel_stars)
VALUES ('Grand Pets Hotel', 5), ('Pets Heaven', 2);

INSERT INTO dog_rooms (dog_id, hotel_id, register_date, unregister_date)
VALUES (1, 1, '2020-06-08', '2020-06-10'), (2, 2, '2020-06-10', '2020-06-15'), (3, 2, '2020-06-20', '2020-06-23');

INSERT INTO cat_rooms (cat_id, hotel_id, register_date, unregister_date)
VALUES (1, 1, '2020-06-08', '2020-06-10'), (2, 2, '2020-06-10', '2020-06-15'), (3, 2, '2020-06-20', '2020-06-23');

-- 2. Select
SELECT * FROM dog_rooms;

-- 3. Where
SELECT cat_id FROM cat_rooms WHERE hotel_id = 2;

-- 4. Sort
SELECT * FROM pet_owners ORDER BY owner_age DESC;

-- 5. Count
SELECT COUNT(*) FROM cats WHERE cat_age >= 3;

-- 6. Delete
DELETE FROM cats WHERE cat_age <= 2;
DELETE FROM dogs WHERE dog_age <= 2;
