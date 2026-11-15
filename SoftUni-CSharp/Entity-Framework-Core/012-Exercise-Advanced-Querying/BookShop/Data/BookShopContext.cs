using BookShop.Models;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data;

public class BookShopContext : DbContext
{
    public const string ConnectionString =
        "Server=localhost,1433;Database=BookShop;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public BookShopContext()
    {
    }

    public BookShopContext(DbContextOptions<BookShopContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Author> Authors { get; set; }

    public DbSet<BookCategory> BooksCategories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.Property(a => a.FirstName).HasMaxLength(50).IsUnicode();
            entity.Property(a => a.LastName).IsRequired().HasMaxLength(50).IsUnicode();
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.Property(b => b.Title).IsRequired().HasMaxLength(50).IsUnicode();
            entity.Property(b => b.Description).IsRequired().HasMaxLength(1000).IsUnicode();
            entity.Property(b => b.Price).HasPrecision(18, 2);
            entity.HasOne(b => b.Author).WithMany(a => a.Books).HasForeignKey(b => b.AuthorId);
        });

        modelBuilder.Entity<Category>().Property(c => c.Name).IsRequired().HasMaxLength(50).IsUnicode();

        modelBuilder.Entity<BookCategory>(entity =>
        {
            entity.HasKey(bc => new { bc.BookId, bc.CategoryId });
            entity.HasOne(bc => bc.Book).WithMany(b => b.BookCategories).HasForeignKey(bc => bc.BookId);
            entity.HasOne(bc => bc.Category).WithMany(c => c.CategoryBooks).HasForeignKey(bc => bc.CategoryId);
        });
    }
}
