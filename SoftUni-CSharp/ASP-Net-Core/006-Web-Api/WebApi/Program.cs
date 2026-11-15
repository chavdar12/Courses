using Microsoft.EntityFrameworkCore;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// shortcut: in-memory store resets on restart, swap for SQL Server/Sqlite when data must persist.
// Unique name per app instance: EF shares same-named in-memory databases across the process.
var dbName = $"Shop-{Guid.NewGuid()}";
builder.Services.AddDbContext<ShopDbContext>(o => o.UseInMemoryDatabase(dbName));
builder.Services.AddRouting(o => o.LowercaseUrls = true);
builder.Services.AddControllers().AddXmlSerializerFormatters();
builder.Services.AddProblemDetails();
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p
    .WithOrigins(builder.Configuration.GetSection("Cors:Origins").Get<string[]>())
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ShopDbContext>();
    if (!db.Products.Any())
    {
        db.Products.AddRange(new Product { Name = "Coffee", Price = 4.5m }, new Product { Name = "Tea", Price = 3m });
        db.SaveChanges();
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors();
app.MapControllers();
app.Run();
