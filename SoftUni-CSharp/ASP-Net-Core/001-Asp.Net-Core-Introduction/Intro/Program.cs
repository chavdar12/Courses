var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Fixed culture so prices render the same on every machine.
app.UseRequestLocalization("en-US");
app.UseStaticFiles();
app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
app.Run();
