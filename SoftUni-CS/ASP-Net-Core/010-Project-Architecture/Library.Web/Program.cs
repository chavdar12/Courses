using Library.Data;
using Library.Data.Models;
using Library.Data.Repositories;
using Library.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// shortcut: in-memory store resets on restart, swap for SQL Server/Sqlite when data must persist.
var dbName = $"Library-{Guid.NewGuid()}";
builder.Services.AddDbContext<LibraryDbContext>(o => o.UseInMemoryDatabase(dbName));
builder.Services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
builder.Services.AddScoped<IBookService, BookService>();

// MVC and Razor Pages side by side: /books via a controller, /authors via a page.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LibraryDbContext>();
    db.Authors.Add(
        new Author
        {
            FirstName = "Terry",
            LastName = "Pratchett",
            Books = [new() { Title = "Mort", Year = 1987 }, new() { Title = "Guards! Guards!", Year = 1989 }],
        }
    );
    db.SaveChanges();
}

app.MapControllerRoute("default", "{controller=Books}/{action=Index}/{id?}");
app.MapRazorPages();
app.Run();
