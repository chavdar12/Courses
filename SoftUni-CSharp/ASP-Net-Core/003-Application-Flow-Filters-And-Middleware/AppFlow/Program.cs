using AppFlow.Filters;
using AppFlow.Middleware;
using AppFlow.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options => options.Filters.Add<StopwatchFilter>());

// Lifetimes: a new instance every resolve / one per request / one for the app.
builder.Services.AddTransient<TransientCounter>();
builder.Services.AddScoped<ScopedCounter>();
builder.Services.AddSingleton<SingletonCounter>();

builder.Services.AddSingleton<IFeatureService, FeatureService>();
builder.Services.AddScoped<FeatureFilter>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStatusCodePagesWithReExecute("/Home/Status/{0}");

// Inline middleware: runs before and after everything registered after it.
app.Use(
    async (context, next) =>
    {
        context.Response.Headers["X-Pipeline"] = "inline";
        await next();
    }
);

app.UseRequestId();

app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
app.Run();
