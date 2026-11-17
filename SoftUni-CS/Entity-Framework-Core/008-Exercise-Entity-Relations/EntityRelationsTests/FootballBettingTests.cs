using Microsoft.EntityFrameworkCore;
using P03_FootballBetting.Data;
using P03_FootballBetting.Data.Models;

namespace EntityRelationsTests;

public class FootballBettingTests
{
    private FootballBettingContext context;

    [SetUp]
    public void SetUp() =>
        context = new FootballBettingContext(
            new DbContextOptionsBuilder<FootballBettingContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options
        );

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void PlayerStatisticHasCompositeKey()
    {
        var key = context.Model.FindEntityType(typeof(PlayerStatistic))!.FindPrimaryKey()!;

        Assert.That(
            key.Properties.Select(p => p.Name),
            Is.EqualTo(new[] { nameof(PlayerStatistic.GameId), nameof(PlayerStatistic.PlayerId) })
        );
    }

    [Test]
    public void TeamToSameTableRelationsRestrictDeletes()
    {
        var foreignKeys = context
            .Model.FindEntityType(typeof(Team))!
            .GetForeignKeys()
            .Concat(
                context
                    .Model.FindEntityType(typeof(Game))!
                    .GetForeignKeys()
                    .Where(fk => fk.PrincipalEntityType.ClrType == typeof(Team))
            );

        Assert.That(foreignKeys.Select(fk => fk.DeleteBehavior), Is.All.EqualTo(DeleteBehavior.Restrict));
    }

    [Test]
    public void RelationsRoundTrip()
    {
        var red = new Color { Name = "Red" };
        var town = new Town
        {
            Name = "Sofia",
            Country = new Country { Name = "Bulgaria" },
        };
        var home = new Team
        {
            Name = "CSKA",
            Initials = "CSK",
            PrimaryKitColor = red,
            SecondaryKitColor = new Color { Name = "White" },
            Town = town,
        };
        var away = new Team
        {
            Name = "Levski",
            Initials = "LEV",
            PrimaryKitColor = new Color { Name = "Blue" },
            SecondaryKitColor = red,
            Town = town,
        };
        var player = new Player
        {
            Name = "Hristo",
            SquadNumber = 8,
            Team = home,
            Position = new Position { Name = "Forward" },
        };
        var game = new Game
        {
            HomeTeam = home,
            AwayTeam = away,
            HomeTeamGoals = 2,
            Result = "2:0",
            DateTime = DateTime.Today,
        };
        game.PlayerStatistics.Add(
            new PlayerStatistic
            {
                Player = player,
                ScoredGoals = 2,
                MinutesPlayed = 90,
            }
        );
        game.Bets.Add(
            new Bet
            {
                Amount = 10,
                Prediction = Prediction.HomeTeamWin,
                User = new User
                {
                    Username = "bet",
                    Password = "x",
                    Email = "b@x.bg",
                },
            }
        );
        context.Games.Add(game);
        context.SaveChanges();
        context.ChangeTracker.Clear();

        var loadedRed = context
            .Colors.Include(c => c.PrimaryKitTeams)
            .Include(c => c.SecondaryKitTeams)
            .Single(c => c.Name == "Red");
        var loadedHome = context
            .Teams.Include(t => t.HomeGames)
                .ThenInclude(g => g.Bets)
            .Include(t => t.Players)
                .ThenInclude(p => p.PlayerStatistics)
            .Single(t => t.Name == "CSKA");

        Assert.That(loadedRed.PrimaryKitTeams.Single().Name, Is.EqualTo("CSKA"));
        Assert.That(loadedRed.SecondaryKitTeams.Single().Name, Is.EqualTo("Levski"));
        Assert.That(loadedHome.HomeGames.Single().Bets.Single().Prediction, Is.EqualTo(Prediction.HomeTeamWin));
        Assert.That(loadedHome.Players.Single().PlayerStatistics.Single().ScoredGoals, Is.EqualTo(2));
        Assert.That(context.Towns.Include(t => t.Teams).Single().Teams, Has.Count.EqualTo(2));
    }
}
