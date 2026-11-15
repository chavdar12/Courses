using Microsoft.Data.Sqlite;
using MiniORM.App.Data;
using MiniORM.App.Data.Entities;

namespace MiniORMTests;

// Each test gets a fresh shared in-memory SQLite database seeded from the lab script.
public class DbContextTests
{
    private const string Schema = """
        CREATE TABLE Projects (Id INTEGER PRIMARY KEY, Name VARCHAR(50) NOT NULL);
        CREATE TABLE Departments (Id INTEGER PRIMARY KEY, Name VARCHAR(50) NOT NULL);
        CREATE TABLE Employees (Id INTEGER PRIMARY KEY, FirstName VARCHAR(50) NOT NULL, MiddleName VARCHAR(50), LastName VARCHAR(50) NOT NULL,
            IsEmployed BIT NOT NULL, DepartmentId INT REFERENCES Departments (Id));
        CREATE TABLE EmployeesProjects (ProjectId INT NOT NULL REFERENCES Projects (Id), EmployeeId INT NOT NULL REFERENCES Employees (Id),
            PRIMARY KEY (ProjectId, EmployeeId));
        """;

    private string connectionString;
    private SqliteConnection keepAlive;

    [SetUp]
    public void SetUp()
    {
        // A shared in-memory database lives as long as one connection to it stays open.
        connectionString = $"Data Source={Guid.NewGuid()};Mode=Memory;Cache=Shared";
        keepAlive = new SqliteConnection(connectionString);
        keepAlive.Open();

        var script = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Sql", "MiniORM.sql"));
        var seed = string.Join("\n", script.Split("\nGO").Where(batch => batch.Contains("INSERT INTO")));
        new SqliteCommand(Schema + seed, keepAlive).ExecuteNonQuery();
    }

    [TearDown]
    public void TearDown() => keepAlive.Dispose();

    private SoftUniDbContext CreateContext() => new(() => new SqliteConnection(connectionString));

    [Test]
    public void LoadsEntitiesAndMapsRelations()
    {
        var context = CreateContext();

        Assert.That(context.Employees.Select(e => e.FirstName), Is.EqualTo(new[] { "Stamat", "Petar", "Ivan", "Gosho" }));
        Assert.That(context.Employees.First().IsEmployed, Is.True);
        Assert.That(context.Employees.All(e => e.Department == context.Departments.Single()));
        Assert.That(context.Departments.Single().Employees, Has.Count.EqualTo(4));
        Assert.That(context.Projects.First().EmployeesProjects.Select(ep => ep.Employee.FirstName), Is.EqualTo(new[] { "Stamat", "Ivan" }));
        Assert.That(context.Employees.Single(e => e.FirstName == "Ivan").EmployeesProjects, Has.Count.EqualTo(2));
    }

    [Test]
    public void SaveChangesInsertsUpdatesAndDeletes()
    {
        var context = CreateContext();
        context.Employees.Add(new Employee { FirstName = "New", LastName = "Employee", DepartmentId = 1, IsEmployed = true });
        context.Employees.First().FirstName = "Modified";
        context.EmployeesProjects.Remove(context.EmployeesProjects.First());

        context.SaveChanges();

        var reloaded = CreateContext();
        Assert.That(reloaded.Employees.Select(e => e.FirstName), Is.EqualTo(new[] { "Modified", "Petar", "Ivan", "Gosho", "New" }));
        Assert.That(reloaded.Employees.Last().Id, Is.EqualTo(5));
        Assert.That(reloaded.EmployeesProjects, Has.Count.EqualTo(3));
    }

    [Test]
    public void SaveChangesTwiceDoesNotInsertAgain()
    {
        var context = CreateContext();
        context.Projects.Add(new Project { Name = "Go Project" });

        context.SaveChanges();
        context.SaveChanges();

        Assert.That(CreateContext().Projects, Has.Count.EqualTo(3));
    }

    [Test]
    public void SaveChangesRejectsInvalidEntities()
    {
        var context = CreateContext();
        context.Departments.Add(new Department());

        Assert.That(() => context.SaveChanges(),
            Throws.InvalidOperationException.With.Message.EqualTo("1 Invalid Entities found in DbSet`1!"));
        Assert.That(CreateContext().Departments, Has.Count.EqualTo(1));
    }

    [Test]
    public void FailedSaveRollsBackEverything()
    {
        var context = CreateContext();
        context.Projects.Add(new Project { Name = "Rolled back" });
        context.EmployeesProjects.Add(new EmployeeProject { ProjectId = 1, EmployeeId = 1 });

        Assert.That(() => context.SaveChanges(), Throws.InstanceOf<SqliteException>());
        Assert.That(CreateContext().Projects, Has.Count.EqualTo(2));
    }

    [Test]
    public void AddRejectsNull()
    {
        Assert.That(() => CreateContext().Employees.Add(null), Throws.ArgumentNullException);
    }
}
