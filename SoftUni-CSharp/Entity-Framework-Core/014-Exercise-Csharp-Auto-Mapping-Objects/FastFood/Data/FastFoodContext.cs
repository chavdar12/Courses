using FastFood.Models;
using Microsoft.EntityFrameworkCore;

namespace FastFood.Data;

public class FastFoodContext : DbContext
{
    public FastFoodContext(DbContextOptions<FastFoodContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<Item> Items { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }

    public DbSet<Position> Positions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Position>().HasIndex(p => p.Name).IsUnique();
        modelBuilder.Entity<Item>().HasIndex(i => i.Name).IsUnique();
        modelBuilder.Entity<Item>().Property(i => i.Price).HasPrecision(18, 2);
        modelBuilder.Entity<OrderItem>().HasKey(oi => new { oi.OrderId, oi.ItemId });
    }
}
