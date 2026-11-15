using Microsoft.EntityFrameworkCore;
using MusicHub.Data.Models;

namespace MusicHub.Data;

public class MusicHubDbContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=MusicHub;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public MusicHubDbContext()
    {
    }

    public MusicHubDbContext(DbContextOptions<MusicHubDbContext> options)
        : base(options)
    {
    }

    public DbSet<Song> Songs { get; set; }

    public DbSet<Album> Albums { get; set; }

    public DbSet<Performer> Performers { get; set; }

    public DbSet<Producer> Producers { get; set; }

    public DbSet<Writer> Writers { get; set; }

    public DbSet<SongPerformer> SongsPerformers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Song>().Property(s => s.Price).HasPrecision(18, 2);
        modelBuilder.Entity<Performer>().Property(p => p.NetWorth).HasPrecision(18, 2);

        modelBuilder.Entity<SongPerformer>(entity =>
        {
            entity.HasKey(sp => new { sp.SongId, sp.PerformerId });
            entity.HasOne(sp => sp.Song).WithMany(s => s.SongPerformers).HasForeignKey(sp => sp.SongId);
            entity.HasOne(sp => sp.Performer).WithMany(p => p.PerformerSongs).HasForeignKey(sp => sp.PerformerId);
        });
    }
}
