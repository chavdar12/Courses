-- Problem 15
SELECT *
FROM Employees
ORDER BY
    Salary DESC, FirstName, LastName DESC,
    MiddleName
