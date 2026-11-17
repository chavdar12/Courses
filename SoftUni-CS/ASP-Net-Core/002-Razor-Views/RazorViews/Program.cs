using RazorViews.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IBookService, BookService>();

var app = builder.Build();
app.UseRequestLocalization("en-US");
app.MapControllerRoute("default", "{controller=Books}/{action=Index}/{id?}");
app.Run();
