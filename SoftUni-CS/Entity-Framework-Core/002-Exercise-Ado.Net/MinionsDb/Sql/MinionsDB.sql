CREATE DATABASE MinionsDB
GO

USE MinionsDB
GO

CREATE TABLE Countries
(
    Id   INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
)

CREATE TABLE Towns
(
    Id          INT IDENTITY PRIMARY KEY,
    Name        NVARCHAR(50) NOT NULL,
    CountryCode INT REFERENCES Countries (Id)
)

CREATE TABLE Minions
(
    Id     INT IDENTITY PRIMARY KEY,
    Name   NVARCHAR(50) NOT NULL,
    Age    INT          NOT NULL,
    TownId INT REFERENCES Towns (Id)
)

CREATE TABLE EvilnessFactors
(
    Id   INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE
)

CREATE TABLE Villains
(
    Id               INT IDENTITY PRIMARY KEY,
    Name             NVARCHAR(50) NOT NULL,
    EvilnessFactorId INT REFERENCES EvilnessFactors (Id)
)

CREATE TABLE MinionsVillains
(
    MinionId  INT REFERENCES Minions (Id),
    VillainId INT REFERENCES Villains (Id),
    PRIMARY KEY (MinionId, VillainId)
)
GO

INSERT INTO Countries (Name)
VALUES ('Bulgaria'), ('Norway'), ('Cyprus'), ('Greece'), ('United Kingdom');

INSERT INTO Towns (Name, CountryCode)
VALUES ('Sofia', 1), ('Varna', 1), ('Burgas', 1), ('Oslo', 2), ('Larnaca', 3), ('Athens', 4), ('London', 5);

INSERT INTO Minions (Name, Age, TownId)
VALUES ('Bob', 13, 1), ('Kevin', 14, 2), ('Steward', 19, 3), ('Simon', 22, 4), ('Jimmy', 49, 5), ('Vicky', 26, 6), ('Becky', 31, 7);

INSERT INTO EvilnessFactors (Name)
VALUES ('Super good'), ('Good'), ('Bad'), ('Evil'), ('Super evil');

INSERT INTO Villains (Name, EvilnessFactorId)
VALUES ('Gru', 4), ('Victor', 3), ('Jilly', 2), ('Miro', 5), ('Victor Jr.', 1);

INSERT INTO MinionsVillains (MinionId, VillainId)
VALUES (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1),
       (1, 2), (4, 2), (5, 2), (7, 2),
       (2, 3), (3, 3), (6, 3), (7, 3),
       (1, 4), (2, 4);
GO

CREATE PROCEDURE usp_GetOlder @Id INT
AS
UPDATE Minions
SET Age += 1
WHERE Id = @Id
GO
