-- Problem 4.	Employees from Town
CREATE PROC usp_GetEmployeesFromTown(@Town NVARCHAR(50)) AS 
	SELECT FirstName, LastName FROM Employees AS e
	JOIN Addresses AS a 
		ON e.AddressID = a.AddressID
	JOIN Towns AS t 
		ON t.TownID = a.TownID
	WHERE t.Name = @Town

--Do not paste this in Judge. It's for testing purpose only.
EXEC usp_GetEmployeesFromTown sofia
