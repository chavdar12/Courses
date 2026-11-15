using System.Data.Common;
using MiniORM.App.Data.Entities;

namespace MiniORM.App.Data;

public class SoftUniDbContext : DbContext
{
    public SoftUniDbContext(string connectionString)
        : base(connectionString)
    {
    }

    public SoftUniDbContext(Func<DbConnection> connectionFactory)
        : base(connectionFactory)
    {
    }

    public DbSet<Employee> Employees { get; }

    public DbSet<Department> Departments { get; }

    public DbSet<Project> Projects { get; }

    public DbSet<EmployeeProject> EmployeesProjects { get; }
}
