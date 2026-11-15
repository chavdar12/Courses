using Advanced.Services;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace Advanced.Controllers;

public class HomeController(WeatherService weather, ILogger<HomeController> logger) : Controller
{
    private const string VisitsKey = "visits";

    public IActionResult Index()
    {
        logger.LogInformation("Home visited");
        return View();
    }

    public IActionResult Weather(string city = "Sofia") => Content(weather.Forecast(city));

    // Response cache: sets Cache-Control and lets the middleware replay the response.
    [ResponseCache(Duration = 60, VaryByQueryKeys = ["id"])]
    public IActionResult Cached(int id) => Content($"{id}:{Guid.NewGuid()}");

    public IActionResult Visits()
    {
        var visits = (HttpContext.Session.GetInt32(VisitsKey) ?? 0) + 1;
        HttpContext.Session.SetInt32(VisitsKey, visits);
        return Content(visits.ToString());
    }

    // TempData survives exactly one redirect (Post/Redirect/Get).
    [HttpPost, ValidateAntiForgeryToken]
    public IActionResult Save()
    {
        TempData["Message"] = "Saved!";
        return RedirectToAction(nameof(Index));
    }

    public IActionResult Consent()
    {
        HttpContext.Features.Get<ITrackingConsentFeature>()!.GrantConsent();
        return RedirectToAction(nameof(Index));
    }

    // Non-essential cookie: only written once the user consented.
    public IActionResult Theme(string value)
    {
        Response.Cookies.Append("theme", value, new CookieOptions { Secure = true, HttpOnly = true });
        return Content(HttpContext.Features.Get<ITrackingConsentFeature>()!.CanTrack ? "stored" : "needs consent");
    }

    public IActionResult Big() => Content(string.Concat(Enumerable.Repeat("compress me ", 500)));
}
