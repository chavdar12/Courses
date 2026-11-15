using Microsoft.Data.Sqlite;
using MinionsDb;

namespace MinionsDbTests;

// Runs the tasks against an in-memory SQLite copy of MinionsDB: same seed data as Sql/MinionsDB.sql, SQLite flavoured schema.
public class MinionsTests
{
    private const string Schema = """
        CREATE TABLE Countries (Id INTEGER PRIMARY KEY, Name TEXT NOT NULL);
        CREATE TABLE Towns (Id INTEGER PRIMARY KEY, Name TEXT NOT NULL, CountryCode INT REFERENCES Countries (Id));
        CREATE TABLE Minions (Id INTEGER PRIMARY KEY, Name TEXT NOT NULL, Age INT NOT NULL, TownId INT REFERENCES Towns (Id));
        CREATE TABLE EvilnessFactors (Id INTEGER PRIMARY KEY, Name TEXT NOT NULL UNIQUE);
        CREATE TABLE Villains (Id INTEGER PRIMARY KEY, Name TEXT NOT NULL, EvilnessFactorId INT REFERENCES EvilnessFactors (Id));
        CREATE TABLE MinionsVillains (MinionId INT REFERENCES Minions (Id), VillainId INT REFERENCES Villains (Id), PRIMARY KEY (MinionId, VillainId));
        """;

    private SqliteConnection connection;

    [SetUp]
    public void SetUp()
    {
        connection = new SqliteConnection("Data Source=:memory:");
        connection.Open();

        var script = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Sql", "MinionsDB.sql"));
        var seed = script.Split("\nGO").Where(batch => batch.Contains("INSERT INTO"));
        Minions.InitialSetup(connection, Schema + "\nGO\n" + string.Join("\nGO\n", seed));
    }

    [TearDown]
    public void TearDown() => connection.Dispose();

    [Test]
    public void VillainNamesListsVillainsWithMoreThanThreeMinionsByCountDescending()
    {
        Assert.That(Minions.VillainNames(connection), Is.EqualTo("Gru - 6\nVictor - 4\nJilly - 4").Or.EqualTo("Gru - 6\nJilly - 4\nVictor - 4"));
    }

    [Test]
    public void MinionNamesOrdersMinionsByName()
    {
        Assert.That(Minions.MinionNames(connection, 2), Is.EqualTo("Villain: Victor\n1. Becky 31\n2. Bob 13\n3. Jimmy 49\n4. Simon 22"));
    }

    [Test]
    public void MinionNamesReportsVillainWithoutMinions()
    {
        Assert.That(Minions.MinionNames(connection, 5), Is.EqualTo("Villain: Victor Jr.\n(no minions)"));
    }

    [Test]
    public void MinionNamesReportsMissingVillain()
    {
        Assert.That(Minions.MinionNames(connection, 10), Is.EqualTo("No villain with ID 10 exists in the database."));
    }

    [Test]
    public void AddMinionWithKnownTownAndVillain()
    {
        Assert.That(Minions.AddMinion(connection, "Minion: Bob 14 Sofia", "Villain: Gru"), Is.EqualTo("Successfully added Bob to be minion of Gru."));
        Assert.That(Minions.VillainNames(connection), Does.StartWith("Gru - 7"));
    }

    [Test]
    public void AddMinionAddsMissingTownAndVillain()
    {
        var result = Minions.AddMinion(connection, "Minion: Carry 20 Eindhoven", "Villain: Jimmy");

        Assert.That(result, Is.EqualTo(
            "Town Eindhoven was added to the database.\nVillain Jimmy was added to the database.\nSuccessfully added Carry to be minion of Jimmy."));
        Assert.That(Minions.MinionNames(connection, 6), Is.EqualTo("Villain: Jimmy\n1. Carry 20"));
    }

    [Test]
    public void AddMinionRollsBackWhenAStepFails()
    {
        Assert.That(() => Minions.AddMinion(connection, "Minion: Mars notAnAge Sofia", "Villain: Poppy"), Throws.InstanceOf<FormatException>());

        new SqliteCommand("DROP TABLE MinionsVillains", connection).ExecuteNonQuery();
        Assert.That(() => Minions.AddMinion(connection, "Minion: Mars 23 Plovdiv", "Villain: Poppy"), Throws.Exception);
        Assert.That(new SqliteCommand("SELECT COUNT(*) FROM Towns WHERE Name = 'Plovdiv'", connection).ExecuteScalar(), Is.EqualTo(0L));
    }

    [Test]
    public void ChangeTownNamesCasingUppercasesTownsOfTheCountry()
    {
        Assert.That(Minions.ChangeTownNamesCasing(connection, "Bulgaria"), Is.EqualTo("3 town names were affected.\n[SOFIA, VARNA, BURGAS]"));
    }

    [Test]
    public void ChangeTownNamesCasingReportsUnknownCountry()
    {
        Assert.That(Minions.ChangeTownNamesCasing(connection, "Germany"), Is.EqualTo("No town names were affected."));
    }

    [Test]
    public void RemoveVillainReleasesMinions()
    {
        Assert.That(Minions.RemoveVillain(connection, 1), Is.EqualTo("Gru was deleted.\n6 minions were released."));
        Assert.That(Minions.MinionNames(connection, 1), Is.EqualTo("No villain with ID 1 exists in the database."));
    }

    [Test]
    public void RemoveVillainReportsMissingVillain()
    {
        Assert.That(Minions.RemoveVillain(connection, 101), Is.EqualTo("No such villain was found."));
    }

    [Test]
    public void PrintAllMinionNamesAlternatesFirstAndLast()
    {
        Assert.That(Minions.PrintAllMinionNames(connection), Is.EqualTo("Bob\nBecky\nKevin\nVicky\nSteward\nJimmy\nSimon"));
    }

    [Test]
    public void IncreaseMinionAgeTitleCasesAndAgesOnlyTheGivenMinions()
    {
        new SqliteCommand("UPDATE Minions SET Name = 'vicky jackson' WHERE Id = 6", connection).ExecuteNonQuery();

        Assert.That(Minions.IncreaseMinionAge(connection, "6 1"), Is.EqualTo(
            "Bob 14\nKevin 14\nSteward 19\nSimon 22\nJimmy 49\nVicky Jackson 27\nBecky 31"));
    }
}
