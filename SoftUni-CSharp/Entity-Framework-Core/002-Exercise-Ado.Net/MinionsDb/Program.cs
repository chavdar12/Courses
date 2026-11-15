using Microsoft.Data.SqlClient;
using MinionsDb;

// Usage: dotnet run -- <task number 1-9>, then type the task's input.
var task = args.Length > 0 ? int.Parse(args[0]) : int.Parse(Console.ReadLine()!);

if (task == 1)
{
    using var server = new SqlConnection(Configuration.ServerConnectionString);
    server.Open();
    Minions.InitialSetup(server, File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Sql", "MinionsDB.sql")));
    Console.WriteLine("MinionsDB created.");
    return;
}

using var connection = new SqlConnection(Configuration.ConnectionString);
connection.Open();

Console.WriteLine(task switch
{
    2 => Minions.VillainNames(connection),
    3 => Minions.MinionNames(connection, int.Parse(Console.ReadLine()!)),
    4 => Minions.AddMinion(connection, Console.ReadLine(), Console.ReadLine()),
    5 => Minions.ChangeTownNamesCasing(connection, Console.ReadLine()),
    6 => Minions.RemoveVillain(connection, int.Parse(Console.ReadLine()!)),
    7 => Minions.PrintAllMinionNames(connection),
    8 => Minions.IncreaseMinionAge(connection, Console.ReadLine()),
    9 => Minions.IncreaseAgeStoredProcedure(connection, int.Parse(Console.ReadLine()!)),
    _ => "Unknown task. Use 1-9."
});
