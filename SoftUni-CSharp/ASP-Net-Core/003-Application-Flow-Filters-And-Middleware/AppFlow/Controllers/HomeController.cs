using AppFlow.Filters;
using AppFlow.Middleware;
using AppFlow.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace AppFlow.Controllers;

public class HomeController(IConfiguration configuration) : Controller
{
    public IActionResult Index() => Content($"{configuration["App:Name"]} ({HttpContext.Items[RequestIdMiddleware.Header]})");

    // Two transients differ; two scoped match within the request; singleton matches forever.
    public IActionResult Lifetimes(
        [FromServices] TransientCounter t1, [FromServices] TransientCounter t2,
        [FromServices] ScopedCounter s1, [FromServices] ScopedCounter s2,
        [FromServices] SingletonCounter singleton) =>
        Json(new { transientSame = t1.Id == t2.Id, scopedSame = s1.Id == s2.Id, scoped = s1.Id, singleton = singleton.Id });

    [AddHeader("X-Author", "SoftUni")]
    public IActionResult Header() => Content("Look at the headers");

    [ServiceFilter(typeof(FeatureFilter))]
    public IActionResult Reports() => Content("Reports are on");

    [ServiceFilter(typeof(FeatureFilter))]
    public IActionResult Beta() => Content("Beta is on");

    public IActionResult Crash() => throw new InvalidOperationException("Boom");

    public IActionResult Error()
    {
        var error = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
        return View(model: error?.Path);
    }

    [Route("Home/Status/{code:int}")]
    public IActionResult Status(int code) => View(code);
}
