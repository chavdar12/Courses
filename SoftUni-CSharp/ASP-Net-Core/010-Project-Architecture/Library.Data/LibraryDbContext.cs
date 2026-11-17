using Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Data;

public class LibraryDbContext(DbContextOptions<LibraryDbContext> options) : DbContext(options)
{
    public DbSet<Author> Authors => Set<Author>();

    public DbSet<Book> Books => Set<Book>();
}
