using Microsoft.EntityFrameworkCore;
using P03_FootballBetting.Data.Models;

namespace P03_FootballBetting.Data;

public class FootballBettingContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=FootballBetting;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public FootballBettingContext()
    {
    }

    public FootballBettingContext(DbContextOptions<FootballBettingContext> options)
        : base(options)
    {
    }

    public DbSet<Team> Teams { get; set; }

    public DbSet<Color> Colors { get; set; }

    public DbSet<Town> Towns { get; set; }

    public DbSet<Country> Countries { get; set; }

    public DbSet<Player> Players { get; set; }

    public DbSet<Position> Positions { get; set; }

    public DbSet<PlayerStatistic> PlayersStatistics { get; set; }

    public DbSet<Game> Games { get; set; }

    public DbSet<Bet> Bets { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Team>(entity =>
        {
            entity.Property(t => t.Name).IsRequired().HasMaxLength(50);
            entity.Property(t => t.Initials).IsRequired().HasMaxLength(3).IsFixedLength();
            entity.Property(t => t.Budget).HasPrecision(18, 2);

            // Two relations to the same table would give SQL Server multiple cascade paths, so deletes are restricted.
            entity.HasOne(t => t.PrimaryKitColor).WithMany(c => c.PrimaryKitTeams).HasForeignKey(t => t.PrimaryKitColorId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(t => t.SecondaryKitColor).WithMany(c => c.SecondaryKitTeams).HasForeignKey(t => t.SecondaryKitColorId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(t => t.Town).WithMany(t => t.Teams).HasForeignKey(t => t.TownId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Color>().Property(c => c.Name).IsRequired().HasMaxLength(30);

        modelBuilder.Entity<Town>(entity =>
        {
            entity.Property(t => t.Name).IsRequired().HasMaxLength(50);
            entity.HasOne(t => t.Country).WithMany(c => c.Towns).HasForeignKey(t => t.CountryId);
        });

        modelBuilder.Entity<Country>().Property(c => c.Name).IsRequired().HasMaxLength(50);

        modelBuilder.Entity<Position>().Property(p => p.Name).IsRequired().HasMaxLength(30);

        modelBuilder.Entity<Player>(entity =>
        {
            entity.Property(p => p.Name).IsRequired().HasMaxLength(100);
            entity.HasOne(p => p.Team).WithMany(t => t.Players).HasForeignKey(p => p.TeamId);
            entity.HasOne(p => p.Position).WithMany(p => p.Players).HasForeignKey(p => p.PositionId);
        });

        modelBuilder.Entity<PlayerStatistic>(entity =>
        {
            entity.HasKey(ps => new { ps.GameId, ps.PlayerId });
            entity.HasOne(ps => ps.Game).WithMany(g => g.PlayerStatistics).HasForeignKey(ps => ps.GameId);
            entity.HasOne(ps => ps.Player).WithMany(p => p.PlayerStatistics).HasForeignKey(ps => ps.PlayerId);
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.Property(g => g.Result).HasMaxLength(7);
            entity.HasOne(g => g.HomeTeam).WithMany(t => t.HomeGames).HasForeignKey(g => g.HomeTeamId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(g => g.AwayTeam).WithMany(t => t.AwayGames).HasForeignKey(g => g.AwayTeamId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Bet>(entity =>
        {
            entity.Property(b => b.Amount).HasPrecision(18, 2);
            entity.Property(b => b.Prediction).IsRequired();
            entity.HasOne(b => b.User).WithMany(u => u.Bets).HasForeignKey(b => b.UserId);
            entity.HasOne(b => b.Game).WithMany(g => g.Bets).HasForeignKey(b => b.GameId);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Username).IsRequired().HasMaxLength(50);
            entity.Property(u => u.Password).IsRequired().HasMaxLength(256);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(100);
            entity.Property(u => u.Name).HasMaxLength(100);
            entity.Property(u => u.Balance).HasPrecision(18, 2);
        });
    }
}
