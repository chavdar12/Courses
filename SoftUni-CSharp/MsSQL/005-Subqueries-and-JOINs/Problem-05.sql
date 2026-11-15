-- Problem 5.	Employees Without Project
SELECT DISTINCT TOP(3) e.EmployeeID, e.FirstName
FROM Employees AS e
         RIGHT JOIN EmployeesProjects AS ep
                    ON e.EmployeeID NOT IN (SELECT DISTINCT EmployeeID FROM EmployeesProjects)
ORDER BY e.EmployeeID
