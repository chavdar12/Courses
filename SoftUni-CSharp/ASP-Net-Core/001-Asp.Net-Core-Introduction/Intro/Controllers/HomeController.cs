using Microsoft.AspNetCore.Mvc;

namespace Intro.Controllers;

public class HomeController : Controller
{
    // Conventional route: / and /Home/Index both land here.
    public IActionResult Index() => View();

    public IActionResult About() => Content("ASP.NET Core MVC intro");

    // Each action result type picks the response format.
    public IActionResult Time() => Json(new { utc = DateTime.UtcNow });

    public IActionResult Docs() => Redirect("https://learn.microsoft.com/aspnet/core");
}
