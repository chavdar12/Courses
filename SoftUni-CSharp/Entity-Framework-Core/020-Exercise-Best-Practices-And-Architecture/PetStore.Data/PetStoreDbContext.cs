using Microsoft.EntityFrameworkCore;
using PetStore.Data.Models;

namespace PetStore.Data;

public class PetStoreDbContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=PetStore;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public PetStoreDbContext()
    {
    }

    public PetStoreDbContext(DbContextOptions<PetStoreDbContext> options)
        : base(options)
    {
    }

    public DbSet<Client> Clients { get; set; }

    public DbSet<Distributor> Distributors { get; set; }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<Pet> Pets { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<Purchase> Purchases { get; set; }

    public DbSet<Sale> Sales { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>().Property(c => c.Name).IsRequired().HasMaxLength(100);
        modelBuilder.Entity<Distributor>().HasIndex(d => d.Name).IsUnique();
        modelBuilder.Entity<Distributor>().Property(d => d.Name).IsRequired().HasMaxLength(100);
        modelBuilder.Entity<Employee>().Property(e => e.MonthlySalary).HasPrecision(18, 2);
        modelBuilder.Entity<Pet>().Property(p => p.Price).HasPrecision(18, 2);
        modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();
        modelBuilder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(18, 2);
        modelBuilder.Entity<Purchase>().Property(p => p.UnitCost).HasPrecision(18, 2);
        modelBuilder.Entity<Sale>().Property(s => s.Price).HasPrecision(18, 2);
    }
}
