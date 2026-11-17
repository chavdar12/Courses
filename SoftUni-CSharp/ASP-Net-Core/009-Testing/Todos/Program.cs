using Microsoft.EntityFrameworkCore;
using Todos.Data;
using Todos.Services;

var builder = WebApplication.CreateBuilder(args);

// shortcut: in-memory store resets on restart, swap for SQL Server/Sqlite when data must persist.
var dbName = $"Todos-{Guid.NewGuid()}";
builder.Services.AddDbContext<TodoDbContext>(o => o.UseInMemoryDatabase(dbName));
builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddControllersWithViews();

var app = builder.Build();
app.MapControllerRoute("default", "{controller=Todos}/{action=Index}/{id?}");
app.Run();
