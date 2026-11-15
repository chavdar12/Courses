using Microsoft.EntityFrameworkCore;
using SoftUni;
using SoftUni.Data;
using SoftUni.Models;

namespace SoftUniTests;

// Runs every query against a small in-memory slice of the SoftUni database.
public class StartUpTests
{
    private SoftUniContext context;

    [SetUp]
    public void SetUp()
    {
        context = new SoftUniContext(new DbContextOptionsBuilder<SoftUniContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

        context.Towns.AddRange(Town(1, "Redmond"), Town(2, "Seattle"), Town(3, "Bothell"), Town(4, "Sofia"));
        context.Addresses.AddRange(
            Address(1, "108 Lakeside Court", 3),
            Address(2, "1970 Napa Ct.", 3),
            Address(3, "9745 Bonita Ct.", 2),
            Address(4, "7559 Worth Ct.", 2),
            Address(5, "163 Nishava Str, ent A, apt. 1", 4));
        context.Departments.AddRange(
            Department(1, "Engineering", 8),
            Department(2, "Research and Development", 3),
            Department(3, "Marketing", 2),
            Department(4, "Production", 1));
        context.Employees.AddRange(
            Employee(1, "Guy", "Gilbert", "R", "Production Technician", 4, 3, 12500, 1),
            Employee(2, "Kevin", "Brown", "F", "Marketing Assistant", 3, 1, 13500, 3),
            Employee(3, "Svetlin", "Nakov", "I", "Engineer", 1, 8, 60000, 5),
            Employee(4, "Gigi", "Matthew", null, "Research Assistant", 2, 3, 40900, 3),
            Employee(5, "Diane", "Margheim", null, "Research Assistant", 2, 3, 40900, 4),
            Employee(6, "Samantha", "Smith", null, "Production Technician", 1, 3, 14000, 2),
            Employee(7, "Sairaj", "Uddin", null, "Scheduling Assistant", 1, 3, 16000, 5),
            Employee(8, "Terri", "Duffy", "L", "VP Engineering", 1, null, 63500, null),
            Employee(9, "Gail", "Erickson", "A", "Design Engineer", 1, 8, 32700, null),
            Employee(10, "Jossef", "Goldberg", "H", "Design Engineer", 1, 8, 32700, null),
            Employee(147, "Linda", "Randall", null, "Production Technician", 4, 1, 15000, null));
        context.Projects.AddRange(
            Project(1, "Classic Vest", new DateTime(2003, 6, 1), null),
            Project(2, "Cycling Cap", new DateTime(2001, 6, 1), new DateTime(2003, 6, 1)),
            Project(3, "Full-Finger Gloves", new DateTime(2002, 6, 1), new DateTime(2003, 6, 1)),
            Project(4, "Racing Socks", new DateTime(2005, 11, 22), null));
        context.EmployeesProjects.AddRange(
            Link(1, 3), Link(1, 4), Link(2, 2), Link(3, 1), Link(147, 3), Link(147, 1));
        context.SaveChanges();
        context.ChangeTracker.Clear();
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void EmployeesFullInformation()
    {
        Assert.That(StartUp.GetEmployeesFullInformation(context), Does.StartWith(
            "Guy Gilbert R Production Technician 12500.00\nKevin Brown F Marketing Assistant 13500.00\n"));
    }

    [Test]
    public void EmployeesWithSalaryOver50000()
    {
        Assert.That(StartUp.GetEmployeesWithSalaryOver50000(context), Is.EqualTo("Svetlin - 60000.00\nTerri - 63500.00"));
    }

    [Test]
    public void EmployeesFromResearchAndDevelopment()
    {
        Assert.That(StartUp.GetEmployeesFromResearchAndDevelopment(context), Is.EqualTo(
            "Gigi Matthew from Research and Development - $40900.00\nDiane Margheim from Research and Development - $40900.00"));
    }

    [Test]
    public void AddNewAddressToEmployee()
    {
        Assert.That(StartUp.AddNewAddressToEmployee(context), Does.StartWith(
            "Vitoshka 15\n163 Nishava Str, ent A, apt. 1\n7559 Worth Ct.\n9745 Bonita Ct.\n9745 Bonita Ct.\n1970 Napa Ct.\n108 Lakeside Court"));
        Assert.That(context.Employees.Where(e => e.LastName == "Nakov").Select(e => e.Address.Town.Name).Single(), Is.EqualTo("Sofia"));
    }

    [Test]
    public void EmployeesInPeriod()
    {
        Assert.That(StartUp.GetEmployeesInPeriod(context), Is.EqualTo("""
            Guy Gilbert - Manager: Svetlin Nakov
            --Full-Finger Gloves - 6/1/2002 12:00:00 AM - 6/1/2003 12:00:00 AM
            --Racing Socks - 11/22/2005 12:00:00 AM - not finished
            Kevin Brown - Manager: Guy Gilbert
            --Cycling Cap - 6/1/2001 12:00:00 AM - 6/1/2003 12:00:00 AM
            Svetlin Nakov - Manager: Terri Duffy
            --Classic Vest - 6/1/2003 12:00:00 AM - not finished
            Linda Randall - Manager: Guy Gilbert
            --Full-Finger Gloves - 6/1/2002 12:00:00 AM - 6/1/2003 12:00:00 AM
            --Classic Vest - 6/1/2003 12:00:00 AM - not finished
            """));
    }

    [Test]
    public void AddressesByTown()
    {
        Assert.That(StartUp.GetAddressesByTown(context), Is.EqualTo("""
            9745 Bonita Ct., Seattle - 2 employees
            163 Nishava Str, ent A, apt. 1, Sofia - 2 employees
            108 Lakeside Court, Bothell - 1 employees
            1970 Napa Ct., Bothell - 1 employees
            7559 Worth Ct., Seattle - 1 employees
            """));
    }

    [Test]
    public void Employee147()
    {
        Assert.That(StartUp.GetEmployee147(context), Is.EqualTo("Linda Randall - Production Technician\nClassic Vest\nFull-Finger Gloves"));
    }

    [Test]
    public void DepartmentsWithMoreThan5Employees()
    {
        Assert.That(StartUp.GetDepartmentsWithMoreThan5Employees(context), Is.EqualTo("""
            Engineering - Terri Duffy
            Gail Erickson - Design Engineer
            Jossef Goldberg - Design Engineer
            Sairaj Uddin - Scheduling Assistant
            Samantha Smith - Production Technician
            Svetlin Nakov - Engineer
            Terri Duffy - VP Engineering
            """));
    }

    [Test]
    public void LatestProjects()
    {
        Assert.That(StartUp.GetLatestProjects(context), Does.StartWith(
            "Classic Vest\nResearch of Classic Vest\n6/1/2003 12:00:00 AM\nCycling Cap\n"));
    }

    [Test]
    public void IncreaseSalaries()
    {
        Assert.That(StartUp.IncreaseSalaries(context), Is.EqualTo("""
            Gail Erickson ($36624.00)
            Jossef Goldberg ($36624.00)
            Kevin Brown ($15120.00)
            Sairaj Uddin ($17920.00)
            Samantha Smith ($15680.00)
            Svetlin Nakov ($67200.00)
            Terri Duffy ($71120.00)
            """));
        Assert.That(context.Employees.AsNoTracking().Single(e => e.EmployeeId == 1).Salary, Is.EqualTo(12500));
    }

    [Test]
    public void EmployeesByFirstNameStartingWithSaIgnoresCase()
    {
        context.Employees.Add(Employee(11, "sabrina", "Lowercase", null, "Intern", 4, 1, 1000, null));
        context.SaveChanges();

        Assert.That(StartUp.GetEmployeesByFirstNameStartingWithSa(context), Is.EqualTo(
            "sabrina Lowercase - Intern - ($1000.00)\nSairaj Uddin - Scheduling Assistant - ($16000.00)\nSamantha Smith - Production Technician - ($14000.00)"));
    }

    [Test]
    public void DeleteProjectById()
    {
        Assert.That(StartUp.DeleteProjectById(context), Is.EqualTo("Classic Vest\nFull-Finger Gloves\nRacing Socks"));
        Assert.That(context.EmployeesProjects.Any(ep => ep.ProjectId == 2), Is.False);
    }

    [Test]
    public void RemoveTown()
    {
        Assert.That(StartUp.RemoveTown(context), Is.EqualTo("2 addresses in Seattle were deleted"));
        Assert.That(context.Towns.Any(t => t.Name == "Seattle"), Is.False);
        Assert.That(context.Employees.Count(e => e.AddressId == null), Is.EqualTo(7));
    }

    private static Town Town(int id, string name) => new() { TownId = id, Name = name };

    private static Address Address(int id, string text, int townId) => new() { AddressId = id, AddressText = text, TownId = townId };

    private static Department Department(int id, string name, int managerId) => new() { DepartmentId = id, Name = name, ManagerId = managerId };

    private static Employee Employee(int id, string first, string last, string middle, string job, int departmentId, int? managerId, decimal salary, int? addressId) =>
        new()
        {
            EmployeeId = id, FirstName = first, LastName = last, MiddleName = middle, JobTitle = job, DepartmentId = departmentId,
            ManagerId = managerId, Salary = salary, AddressId = addressId, HireDate = new DateTime(2000, 1, 1)
        };

    private static Project Project(int id, string name, DateTime start, DateTime? end) =>
        new() { ProjectId = id, Name = name, Description = $"Research of {name}", StartDate = start, EndDate = end };

    private static EmployeeProject Link(int employeeId, int projectId) => new() { EmployeeId = employeeId, ProjectId = projectId };
}
