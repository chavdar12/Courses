using FastFood.Data;
using FastFood.MappingConfiguration;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<FastFoodContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FastFood"))
);
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<FastFoodProfile>());
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<FastFoodContext>().Database.EnsureCreated();
}

app.MapControllers();
app.Run();
