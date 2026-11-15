using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

// App Service / containers sit behind a proxy that terminates TLS; trust its X-Forwarded-* headers.
builder.Services.Configure<ForwardedHeadersOptions>(o =>
{
    o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    o.KnownIPNetworks.Clear();
    o.KnownProxies.Clear();
});

var app = builder.Build();

app.UseForwardedHeaders();

// The pipeline injects Build__Version, so a deployed app tells you which commit it runs.
app.MapGet("/", (IConfiguration config, IWebHostEnvironment env, HttpContext ctx) => new
{
    app = env.ApplicationName,
    environment = env.EnvironmentName,
    version = config["Build:Version"],
    scheme = ctx.Request.Scheme,
});

// App Service health check / container probe target.
app.MapHealthChecks("/health");

app.Run();
