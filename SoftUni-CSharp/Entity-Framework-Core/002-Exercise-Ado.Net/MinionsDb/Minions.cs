using System.Data;
using System.Data.Common;
using System.Globalization;
using System.Text;

namespace MinionsDb;

// Every task takes an open connection. The SQL is kept portable, so the same code runs on SQL Server and on SQLite in the tests.
public static class Minions
{
    // 1. Initial Setup
    public static void InitialSetup(DbConnection connection, string script)
    {
        foreach (
            var batch in script.Split("\nGO", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
        )
        {
            Execute(connection, batch);
        }
    }

    // 2. Villain Names
    public static string VillainNames(DbConnection connection)
    {
        using var reader = Command(
                connection,
                """
                SELECT v.Name, COUNT(mv.MinionId) AS MinionsCount
                FROM Villains v
                JOIN MinionsVillains mv ON mv.VillainId = v.Id
                GROUP BY v.Id, v.Name
                HAVING COUNT(mv.MinionId) > 3
                ORDER BY MinionsCount DESC
                """
            )
            .ExecuteReader();

        var result = new StringBuilder();
        while (reader.Read())
        {
            result.AppendLine($"{reader.GetString(0)} - {reader.GetInt32(1)}");
        }

        return result.ToString().TrimEnd();
    }

    // 3. Minion Names
    public static string MinionNames(DbConnection connection, int villainId)
    {
        var villainName = Command(connection, "SELECT Name FROM Villains WHERE Id = @Id", null, ("@Id", villainId))
            .ExecuteScalar();
        if (villainName == null)
        {
            return $"No villain with ID {villainId} exists in the database.";
        }

        var result = new StringBuilder($"Villain: {villainName}\n");
        using var reader = Command(
                connection,
                """
                SELECT m.Name, m.Age
                FROM MinionsVillains mv
                JOIN Minions m ON m.Id = mv.MinionId
                WHERE mv.VillainId = @Id
                ORDER BY m.Name
                """,
                null,
                ("@Id", villainId)
            )
            .ExecuteReader();

        var row = 0;
        while (reader.Read())
        {
            result.AppendLine($"{++row}. {reader.GetString(0)} {reader.GetInt32(1)}");
        }

        return row == 0 ? result + "(no minions)" : result.ToString().TrimEnd();
    }

    // 4. Add Minion (bonus: everything runs in one transaction)
    public static string AddMinion(DbConnection connection, string minionLine, string villainLine)
    {
        var minion = minionLine.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var (name, age, town) = (minion[1], int.Parse(minion[2]), minion[3]);
        var villain = villainLine.Split(": ", 2)[1].Trim();
        var result = new StringBuilder();

        using var transaction = connection.BeginTransaction();
        try
        {
            var townId = GetOrAdd(
                connection,
                transaction,
                "SELECT Id FROM Towns WHERE Name = @Name",
                "INSERT INTO Towns (Name) VALUES (@Name)",
                town,
                () => result.AppendLine($"Town {town} was added to the database.")
            );

            var villainId = GetOrAdd(
                connection,
                transaction,
                "SELECT Id FROM Villains WHERE Name = @Name",
                "INSERT INTO Villains (Name, EvilnessFactorId) VALUES (@Name, (SELECT Id FROM EvilnessFactors WHERE Name = 'Evil'))",
                villain,
                () => result.AppendLine($"Villain {villain} was added to the database.")
            );

            Command(
                    connection,
                    "INSERT INTO Minions (Name, Age, TownId) VALUES (@Name, @Age, @TownId)",
                    transaction,
                    ("@Name", name),
                    ("@Age", age),
                    ("@TownId", townId)
                )
                .ExecuteNonQuery();
            // No TOP/LIMIT so it stays portable: ExecuteScalar takes the first row, the newest minion with that name.
            var minionId = Command(
                    connection,
                    "SELECT Id FROM Minions WHERE Name = @Name ORDER BY Id DESC",
                    transaction,
                    ("@Name", name)
                )
                .ExecuteScalar();

            Command(
                    connection,
                    "INSERT INTO MinionsVillains (MinionId, VillainId) VALUES (@MinionId, @VillainId)",
                    transaction,
                    ("@MinionId", minionId),
                    ("@VillainId", villainId)
                )
                .ExecuteNonQuery();

            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }

        return result.Append($"Successfully added {name} to be minion of {villain}.").ToString();
    }

    // 5. Change Town Names Casing
    public static string ChangeTownNamesCasing(DbConnection connection, string country)
    {
        const string countryTowns = "CountryCode = (SELECT c.Id FROM Countries c WHERE c.Name = @Country)";

        var affected = Command(
                connection,
                $"UPDATE Towns SET Name = UPPER(Name) WHERE {countryTowns}",
                null,
                ("@Country", country)
            )
            .ExecuteNonQuery();
        if (affected == 0)
        {
            return "No town names were affected.";
        }

        using var reader = Command(
                connection,
                $"SELECT Name FROM Towns WHERE {countryTowns} ORDER BY Id",
                null,
                ("@Country", country)
            )
            .ExecuteReader();
        var towns = new List<string>();
        while (reader.Read())
        {
            towns.Add(reader.GetString(0));
        }

        return $"{affected} town names were affected.\n[{string.Join(", ", towns)}]";
    }

    // 6. *Remove Villain
    public static string RemoveVillain(DbConnection connection, int villainId)
    {
        var name = Command(connection, "SELECT Name FROM Villains WHERE Id = @Id", null, ("@Id", villainId))
            .ExecuteScalar();
        if (name == null)
        {
            return "No such villain was found.";
        }

        using var transaction = connection.BeginTransaction();
        try
        {
            var released = Command(
                    connection,
                    "DELETE FROM MinionsVillains WHERE VillainId = @Id",
                    transaction,
                    ("@Id", villainId)
                )
                .ExecuteNonQuery();
            Command(connection, "DELETE FROM Villains WHERE Id = @Id", transaction, ("@Id", villainId))
                .ExecuteNonQuery();
            transaction.Commit();

            return $"{name} was deleted.\n{released} minions were released.";
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

    // 7. Print All Minion Names: first, last, first + 1, last - 1, ...
    public static string PrintAllMinionNames(DbConnection connection)
    {
        var names = ReadNames(connection, "SELECT Name FROM Minions ORDER BY Id");
        var ordered = new List<string>();
        for (int first = 0, last = names.Count - 1; first <= last; first++, last--)
        {
            ordered.Add(names[first]);
            if (first != last)
            {
                ordered.Add(names[last]);
            }
        }

        return string.Join("\n", ordered);
    }

    // 8. Increase Minion Age
    public static string IncreaseMinionAge(DbConnection connection, string ids)
    {
        var textInfo = CultureInfo.InvariantCulture.TextInfo;
        foreach (var id in ids.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse))
        {
            // Title case is done in C#: SQL has no portable way to capitalise every word.
            var name = (string)
                Command(connection, "SELECT Name FROM Minions WHERE Id = @Id", null, ("@Id", id)).ExecuteScalar();
            if (name == null)
            {
                continue;
            }

            Command(
                    connection,
                    "UPDATE Minions SET Name = @Name, Age = Age + 1 WHERE Id = @Id",
                    null,
                    ("@Name", textInfo.ToTitleCase(name)),
                    ("@Id", id)
                )
                .ExecuteNonQuery();
        }

        using var reader = Command(connection, "SELECT Name, Age FROM Minions ORDER BY Id").ExecuteReader();
        var result = new StringBuilder();
        while (reader.Read())
        {
            result.AppendLine($"{reader.GetString(0)} {reader.GetInt32(1)}");
        }

        return result.ToString().TrimEnd();
    }

    // 9. Increase Age Stored Procedure (SQL Server only: needs usp_GetOlder from Sql/MinionsDB.sql)
    public static string IncreaseAgeStoredProcedure(DbConnection connection, int minionId)
    {
        var command = Command(connection, "usp_GetOlder", null, ("@Id", minionId));
        command.CommandType = CommandType.StoredProcedure;
        command.ExecuteNonQuery();

        using var reader = Command(connection, "SELECT Name, Age FROM Minions WHERE Id = @Id", null, ("@Id", minionId))
            .ExecuteReader();
        return reader.Read() ? $"{reader.GetString(0)} – {reader.GetInt32(1)} years old" : "No such minion was found.";
    }

    private static object GetOrAdd(
        DbConnection connection,
        DbTransaction transaction,
        string select,
        string insert,
        string name,
        Action onAdded
    )
    {
        var id = Command(connection, select, transaction, ("@Name", name)).ExecuteScalar();
        if (id != null)
        {
            return id;
        }

        Command(connection, insert, transaction, ("@Name", name)).ExecuteNonQuery();
        onAdded();
        return Command(connection, select, transaction, ("@Name", name)).ExecuteScalar();
    }

    private static List<string> ReadNames(DbConnection connection, string sql)
    {
        using var reader = Command(connection, sql).ExecuteReader();
        var names = new List<string>();
        while (reader.Read())
        {
            names.Add(reader.GetString(0));
        }

        return names;
    }

    private static void Execute(DbConnection connection, string sql) => Command(connection, sql).ExecuteNonQuery();

    private static DbCommand Command(
        DbConnection connection,
        string sql,
        DbTransaction transaction = null,
        params (string Name, object Value)[] parameters
    )
    {
        var command = connection.CreateCommand();
        command.CommandText = sql;
        command.Transaction = transaction;
        foreach (var (name, value) in parameters)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = value;
            command.Parameters.Add(parameter);
        }

        return command;
    }
}
