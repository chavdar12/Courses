using MiniORM.App.Data;
using MiniORM.App.Data.Entities;

// Create the database first with Sql/MiniORM.sql.
const string connectionString = "Server=localhost,1433;Database=MiniORM;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

var context = new SoftUniDbContext(connectionString);

context.Employees.Add(new Employee
{
    FirstName = "Gosho",
    LastName = "Inserted",
    DepartmentId = context.Departments.First().Id,
    IsEmployed = true
});

var employee = context.Employees.Last();
employee.FirstName = "Modified";

context.SaveChanges();
