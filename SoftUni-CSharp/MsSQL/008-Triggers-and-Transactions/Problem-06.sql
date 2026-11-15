-- Problem 6. Trigger (Diablo database)
-- 1. Block items whose MinLevel is above the user's level in that game
CREATE TRIGGER tr_RestrictItemsAboveUserLevel
ON UserGameItems
INSTEAD OF INSERT
AS
INSERT INTO UserGameItems (ItemId, UserGameId)
SELECT
    i.ItemId,
    i.UserGameId
FROM inserted AS i
JOIN Items AS it ON it.Id = i.ItemId
JOIN UsersGames AS ug ON ug.Id = i.UserGameId
WHERE it.MinLevel <= ug.[Level]
GO

-- 2. Bonus cash in "Bali"
UPDATE ug
SET Cash += 50000
FROM UsersGames AS ug
JOIN Users AS u ON u.Id = ug.UserId
JOIN Games AS g ON g.Id = ug.GameId
WHERE
    g.Name = 'Bali'
    AND u.Username IN ('baleremuda', 'loosenoise', 'inguinalself', 'buildingdeltoid', 'monoxidecos')

-- 3. Buy items 251-299 and 501-539, charge only for what the trigger lets through
DECLARE @Purchases TABLE (UserGameId INT, ItemId INT, Price MONEY)

INSERT INTO @Purchases (UserGameId, ItemId, Price)
SELECT
    ug.Id,
    it.Id,
    it.Price
FROM UsersGames AS ug
JOIN Users AS u ON u.Id = ug.UserId
JOIN Games AS g ON g.Id = ug.GameId
JOIN Items AS it ON it.Id BETWEEN 251 AND 299 OR it.Id BETWEEN 501 AND 539
WHERE
    g.Name = 'Bali'
    AND u.Username IN ('baleremuda', 'loosenoise', 'inguinalself', 'buildingdeltoid', 'monoxidecos')
    AND it.MinLevel <= ug.[Level]
    AND NOT EXISTS (
        SELECT 1 FROM UserGameItems AS ugi
        WHERE ugi.ItemId = it.Id AND ugi.UserGameId = ug.Id
    )

INSERT INTO UserGameItems (ItemId, UserGameId)
SELECT
    ItemId,
    UserGameId
FROM @Purchases

UPDATE ug
SET Cash -= p.Total
FROM UsersGames AS ug
JOIN (SELECT
    UserGameId,
    SUM(Price) AS Total
FROM @Purchases
GROUP BY UserGameId) AS p
    ON p.UserGameId = ug.Id

-- 4. Users in "Bali" with their items
SELECT
    u.Username,
    g.Name,
    ug.Cash,
    it.Name AS [Item Name]
FROM Users AS u
JOIN UsersGames AS ug ON ug.UserId = u.Id
JOIN Games AS g ON g.Id = ug.GameId
JOIN UserGameItems AS ugi ON ugi.UserGameId = ug.Id
JOIN Items AS it ON it.Id = ugi.ItemId
WHERE g.Name = 'Bali'
ORDER BY u.Username, [Item Name]
