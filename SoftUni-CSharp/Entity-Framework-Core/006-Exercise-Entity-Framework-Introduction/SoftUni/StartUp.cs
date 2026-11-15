using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SoftUni.Data;
using SoftUni.Models;

namespace SoftUni;

public class StartUp
{
    private const string DateFormat = "M/d/yyyy h:mm:ss tt";

    public static void Main()
    {
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

        using var context = new SoftUniContext();
        Console.WriteLine(GetEmployeesFullInformation(context));
    }

    // 3. Employees Full Information
    public static string GetEmployeesFullInformation(SoftUniContext context) =>
        Lines(
            context
                .Employees.OrderBy(e => e.EmployeeId)
                .Select(e => $"{e.FirstName} {e.LastName} {e.MiddleName} {e.JobTitle} {e.Salary:f2}")
        );

    // 4. Employees with Salary Over 50 000
    public static string GetEmployeesWithSalaryOver50000(SoftUniContext context) =>
        Lines(
            context
                .Employees.Where(e => e.Salary > 50000)
                .OrderBy(e => e.FirstName)
                .Select(e => $"{e.FirstName} - {e.Salary:f2}")
        );

    // 5. Employees from Research and Development
    public static string GetEmployeesFromResearchAndDevelopment(SoftUniContext context) =>
        Lines(
            context
                .Employees.Where(e => e.Department.Name == "Research and Development")
                .OrderBy(e => e.Salary)
                .ThenByDescending(e => e.FirstName)
                .Select(e => $"{e.FirstName} {e.LastName} from {e.Department.Name} - ${e.Salary:f2}")
        );

    // 6. Adding a New Address and Updating Employee
    public static string AddNewAddressToEmployee(SoftUniContext context)
    {
        var address = new Address { AddressText = "Vitoshka 15", TownId = 4 };
        context.Employees.First(e => e.LastName == "Nakov").Address = address;
        context.SaveChanges();

        return Lines(context.Employees.OrderByDescending(e => e.AddressId).Take(10).Select(e => e.Address.AddressText));
    }

    // 7. Employees and Projects
    public static string GetEmployeesInPeriod(SoftUniContext context)
    {
        var employees = context
            .Employees.Where(e =>
                e.EmployeesProjects.Any(ep => ep.Project.StartDate.Year >= 2001 && ep.Project.StartDate.Year <= 2003)
            )
            .Take(10)
            .Select(e => new
            {
                e.FirstName,
                e.LastName,
                ManagerFirstName = e.Manager.FirstName,
                ManagerLastName = e.Manager.LastName,
                Projects = e.EmployeesProjects.Select(ep => new
                {
                    ep.Project.Name,
                    ep.Project.StartDate,
                    ep.Project.EndDate,
                }),
            })
            .ToList();

        var result = new StringBuilder();
        foreach (var e in employees)
        {
            result.AppendLine($"{e.FirstName} {e.LastName} - Manager: {e.ManagerFirstName} {e.ManagerLastName}");
            foreach (var p in e.Projects)
            {
                var endDate = p.EndDate?.ToString(DateFormat) ?? "not finished";
                result.AppendLine($"--{p.Name} - {p.StartDate.ToString(DateFormat)} - {endDate}");
            }
        }

        return result.ToString().TrimEnd();
    }

    // 8. Addresses by Town
    public static string GetAddressesByTown(SoftUniContext context) =>
        Lines(
            context
                .Addresses.OrderByDescending(a => a.Employees.Count)
                .ThenBy(a => a.Town.Name)
                .ThenBy(a => a.AddressText)
                .Take(10)
                .Select(a => $"{a.AddressText}, {a.Town.Name} - {a.Employees.Count} employees")
        );

    // 9. Employee 147
    public static string GetEmployee147(SoftUniContext context)
    {
        var employee = context
            .Employees.Where(e => e.EmployeeId == 147)
            .Select(e => new
            {
                e.FirstName,
                e.LastName,
                e.JobTitle,
                Projects = e.EmployeesProjects.Select(ep => ep.Project.Name).OrderBy(name => name).ToList(),
            })
            .Single();

        return Lines(employee.Projects.Prepend($"{employee.FirstName} {employee.LastName} - {employee.JobTitle}"));
    }

    // 10. Departments with More Than 5 Employees
    public static string GetDepartmentsWithMoreThan5Employees(SoftUniContext context)
    {
        var departments = context
            .Departments.Where(d => d.Employees.Count > 5)
            .OrderBy(d => d.Employees.Count)
            .ThenBy(d => d.Name)
            .Select(d => new
            {
                d.Name,
                ManagerFirstName = d.Manager.FirstName,
                ManagerLastName = d.Manager.LastName,
                Employees = d
                    .Employees.OrderBy(e => e.FirstName)
                    .ThenBy(e => e.LastName)
                    .Select(e => $"{e.FirstName} {e.LastName} - {e.JobTitle}")
                    .ToList(),
            })
            .ToList();

        return Lines(
            departments.SelectMany(d => d.Employees.Prepend($"{d.Name} - {d.ManagerFirstName} {d.ManagerLastName}"))
        );
    }

    // 11. Find Latest 10 Projects
    public static string GetLatestProjects(SoftUniContext context)
    {
        var projects = context
            .Projects.OrderByDescending(p => p.StartDate)
            .Take(10)
            .OrderBy(p => p.Name)
            .Select(p => new
            {
                p.Name,
                p.Description,
                p.StartDate,
            })
            .ToList();

        return Lines(
            projects.Select(p =>
                string.Join(Environment.NewLine, p.Name, p.Description, p.StartDate.ToString(DateFormat))
            )
        );
    }

    // 12. Increase Salaries
    public static string IncreaseSalaries(SoftUniContext context)
    {
        var departments = new[] { "Engineering", "Tool Design", "Marketing", "Information Services" };
        var employees = context
            .Employees.Where(e => departments.Contains(e.Department.Name))
            .OrderBy(e => e.FirstName)
            .ThenBy(e => e.LastName)
            .ToList();

        employees.ForEach(e => e.Salary *= 1.12m);
        context.SaveChanges();

        return Lines(employees.Select(e => $"{e.FirstName} {e.LastName} (${e.Salary:f2})"));
    }

    // 13. Find Employees by First Name Starting with "Sa"
    public static string GetEmployeesByFirstNameStartingWithSa(SoftUniContext context) =>
        Lines(
            context
                .Employees.Where(e => EF.Functions.Like(e.FirstName, "sa%"))
                .OrderBy(e => e.FirstName)
                .ThenBy(e => e.LastName)
                .Select(e => $"{e.FirstName} {e.LastName} - {e.JobTitle} - (${e.Salary:f2})")
        );

    // 14. Delete Project by Id
    public static string DeleteProjectById(SoftUniContext context)
    {
        const int projectId = 2;

        context.EmployeesProjects.RemoveRange(context.EmployeesProjects.Where(ep => ep.ProjectId == projectId));
        context.Projects.Remove(context.Projects.Find(projectId));
        context.SaveChanges();

        return Lines(context.Projects.Take(10).Select(p => p.Name));
    }

    // 15. Remove Town
    public static string RemoveTown(SoftUniContext context)
    {
        var town = context
            .Towns.Include(t => t.Addresses)
                .ThenInclude(a => a.Employees)
            .Single(t => t.Name == "Seattle");
        var count = town.Addresses.Count;

        foreach (var employee in town.Addresses.SelectMany(a => a.Employees))
        {
            employee.AddressId = null;
        }

        context.Addresses.RemoveRange(town.Addresses);
        context.Towns.Remove(town);
        context.SaveChanges();

        return $"{count} addresses in Seattle were deleted";
    }

    private static string Lines(IEnumerable<string> lines) => string.Join(Environment.NewLine, lines);
}
