using System.Diagnostics;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AppFlow.Filters;

// Global async action filter: times every action.
public class StopwatchFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var stopwatch = Stopwatch.StartNew();
        await next();
        context.HttpContext.Response.Headers["X-Action-Ms"] = stopwatch.ElapsedMilliseconds.ToString();
    }
}
