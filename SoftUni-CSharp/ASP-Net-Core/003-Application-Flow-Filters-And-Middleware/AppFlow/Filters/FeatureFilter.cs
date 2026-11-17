using AppFlow.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AppFlow.Filters;

// Needs DI, so it is applied with [ServiceFilter] / [TypeFilter] instead of as a plain attribute.
public class FeatureFilter(IFeatureService features) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var feature = context.ActionDescriptor.RouteValues["action"];
        if (!features.IsEnabled(feature))
        {
            context.Result = new NotFoundResult();
        }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}
