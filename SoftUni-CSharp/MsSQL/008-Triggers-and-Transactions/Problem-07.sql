-- Problem 7. *Massive Shopping (Diablo database)
DECLARE
    @UserGameId INT = (
        SELECT ug.Id
        FROM UsersGames AS ug
        JOIN Users AS u ON u.Id = ug.UserId
        JOIN Games AS g ON g.Id = ug.GameId
        WHERE
            u.Username = 'Stamat'
            AND g.Name = 'Safflower'
    )

-- Levels 11-12
BEGIN TRY
    BEGIN TRANSACTION
    UPDATE UsersGames
    SET
        Cash -= (
            SELECT SUM(Price) FROM Items
            WHERE MinLevel BETWEEN 11 AND 12
        )
    WHERE Id = @UserGameId;

    IF (
        SELECT Cash FROM UsersGames
        WHERE Id = @UserGameId
    ) < 0
        THROW 50004, 'Not enough cash.', 1;

    INSERT INTO UserGameItems (ItemId, UserGameId)
    SELECT
        Id,
        @UserGameId
    FROM Items
    WHERE MinLevel BETWEEN 11 AND 12
    COMMIT
END TRY
BEGIN CATCH
    ROLLBACK
END CATCH

-- Levels 19-21
BEGIN TRY
    BEGIN TRANSACTION
    UPDATE UsersGames
    SET
        Cash -= (
            SELECT SUM(Price) FROM Items
            WHERE MinLevel BETWEEN 19 AND 21
        )
    WHERE Id = @UserGameId;

    IF (
        SELECT Cash FROM UsersGames
        WHERE Id = @UserGameId
    ) < 0
        THROW 50004, 'Not enough cash.', 1;

    INSERT INTO UserGameItems (ItemId, UserGameId)
    SELECT
        Id,
        @UserGameId
    FROM Items
    WHERE MinLevel BETWEEN 19 AND 21
    COMMIT
END TRY
BEGIN CATCH
    ROLLBACK
END CATCH

SELECT it.Name AS [Item Name]
FROM UserGameItems AS ugi
JOIN Items AS it ON it.Id = ugi.ItemId
WHERE ugi.UserGameId = @UserGameId
ORDER BY [Item Name]
