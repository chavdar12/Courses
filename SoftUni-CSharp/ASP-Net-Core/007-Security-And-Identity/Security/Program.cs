using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Security.Data;
using Security.Services;

const string Smart = "Cookie-or-Bearer";

var builder = WebApplication.CreateBuilder(args);

// shortcut: in-memory store resets on restart, swap for SQL Server/Sqlite when users must persist.
var dbName = $"Identity-{Guid.NewGuid()}";
builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseInMemoryDatabase(dbName));

builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>(o =>
    {
        o.User.RequireUniqueEmail = true;
        o.Lockout.MaxFailedAccessAttempts = 5;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();

// APIs answer 401/403 instead of redirecting to a login page.
builder.Services.ConfigureApplicationCookie(o =>
{
    o.Events.OnRedirectToLogin = ctx => { ctx.Response.StatusCode = 401; return Task.CompletedTask; };
    o.Events.OnRedirectToAccessDenied = ctx => { ctx.Response.StatusCode = 403; return Task.CompletedTask; };
});

builder.Services
    .AddAuthentication(o =>
    {
        o.DefaultAuthenticateScheme = Smart;
        o.DefaultChallengeScheme = Smart;
        o.DefaultForbidScheme = Smart;
    })
    // A "Bearer ..." header means JWT, anything else falls back to the Identity cookie.
    .AddPolicyScheme(Smart, Smart, o => o.ForwardDefaultSelector = ctx =>
        ctx.Request.Headers.Authorization.ToString().StartsWith("Bearer ")
            ? JwtBearerDefaults.AuthenticationScheme
            : IdentityConstants.ApplicationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = TokenService.SigningKey(builder.Configuration),
    });

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("EmployeesOnly", p => p.RequireClaim("EmployeeNumber"));

builder.Services.AddSingleton<TokenService>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

await SeedAdmin(app.Services, app.Configuration);

app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute("default", "{controller=Comments}/{action=Index}/{id?}");
app.Run();

static async Task SeedAdmin(IServiceProvider services, IConfiguration configuration)
{
    using var scope = services.CreateScope();
    var roles = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var users = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    await roles.CreateAsync(new IdentityRole("Admin"));

    var password = configuration["Admin:Password"];
    if (string.IsNullOrEmpty(password))
    {
        return;
    }

    var admin = new ApplicationUser { UserName = configuration["Admin:Email"], Email = configuration["Admin:Email"], FullName = "Admin" };
    await users.CreateAsync(admin, password);
    await users.AddToRoleAsync(admin, "Admin");
}
