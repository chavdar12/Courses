using Advanced.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddMemoryCache();
builder.Services.AddResponseCaching();
builder.Services.AddResponseCompression(o => o.Providers.Add<GzipCompressionProvider>());
builder.Services.AddSingleton<WeatherService>();

// Session data lives server-side (here in memory); the browser only holds the session id cookie.
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(o =>
{
    o.IdleTimeout = TimeSpan.FromMinutes(20);
    o.Cookie.HttpOnly = true;
    o.Cookie.IsEssential = true;
});

// GDPR: non-essential cookies wait for consent.
builder.Services.Configure<CookiePolicyOptions>(o =>
{
    o.CheckConsentNeeded = _ => true;
    o.MinimumSameSitePolicy = SameSiteMode.Lax;
});

// TempData rides on a cookie too; it's functional, so it must not wait for consent.
builder.Services.Configure<CookieTempDataProviderOptions>(o => o.Cookie.IsEssential = true);

var app = builder.Build();

app.UseResponseCompression();
app.UseCookiePolicy();
app.UseResponseCaching();
app.UseSession();

app.MapControllerRoute("areas", "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");
app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
app.Run();
