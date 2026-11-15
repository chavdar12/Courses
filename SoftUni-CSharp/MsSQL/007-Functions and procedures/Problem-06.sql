-- Problem 6.	Employees by Salary Level
CREATE PROC usp_EmployeesBySalaryLevel(@LevelOfSalary NVARCHAR (10)) AS
	SELECT FirstName, LastName FROM Employees
	WHERE dbo.ufn_GetSalaryLevel(Salary) = @LevelOfSalary

--Do not paste this in Judge. It's for testing purpose only.
EXEC usp_EmployeesBySalaryLevel 'High'
