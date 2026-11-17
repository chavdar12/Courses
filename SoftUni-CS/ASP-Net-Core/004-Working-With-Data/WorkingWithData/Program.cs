using WorkingWithData.Binders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers(options => options.ModelBinderProviders.Insert(0, new StudentBinderProvider()));

var app = builder.Build();
app.UseRequestLocalization("en-US");
app.MapControllers();
app.Run();
