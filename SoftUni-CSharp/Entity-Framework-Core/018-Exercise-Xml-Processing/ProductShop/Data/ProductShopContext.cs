using Microsoft.EntityFrameworkCore;
using ProductShop.Models;

namespace ProductShop.Data;

public class ProductShopContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=ProductShop;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public ProductShopContext()
    {
    }

    public ProductShopContext(DbContextOptions<ProductShopContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<CategoryProduct> CategoriesProducts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired();

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).IsRequired();
            entity.Property(p => p.Price).HasPrecision(18, 2);
            // Two relations to Users would give SQL Server multiple cascade paths.
            entity.HasOne(p => p.Seller).WithMany(u => u.ProductsSold).HasForeignKey(p => p.SellerId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(p => p.Buyer).WithMany(u => u.ProductsBought).HasForeignKey(p => p.BuyerId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Category>().Property(c => c.Name).IsRequired().HasMaxLength(15);

        modelBuilder.Entity<CategoryProduct>().HasKey(cp => new { cp.CategoryId, cp.ProductId });
    }
}
