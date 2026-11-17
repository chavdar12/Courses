using CarDealer.Models;
using Microsoft.EntityFrameworkCore;

namespace CarDealer.Data;

public class CarDealerContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=CarDealer;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public CarDealerContext() { }

    public CarDealerContext(DbContextOptions<CarDealerContext> options)
        : base(options) { }

    public DbSet<Car> Cars { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<Part> Parts { get; set; }

    public DbSet<PartCar> PartsCars { get; set; }

    public DbSet<Sale> Sales { get; set; }

    public DbSet<Supplier> Suppliers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Part>().Property(p => p.Price).HasPrecision(18, 2);
        modelBuilder.Entity<Sale>().Property(s => s.Discount).HasPrecision(5, 2);
        modelBuilder.Entity<PartCar>().HasKey(pc => new { pc.PartId, pc.CarId });
    }
}
