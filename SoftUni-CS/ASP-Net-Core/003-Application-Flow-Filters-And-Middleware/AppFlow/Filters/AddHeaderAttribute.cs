using Microsoft.AspNetCore.Mvc.Filters;

namespace AppFlow.Filters;

// Result filter used as an attribute with constructor arguments.
public class AddHeaderAttribute(string name, string value) : ResultFilterAttribute
{
    public override void OnResultExecuting(ResultExecutingContext context)
    {
        context.HttpContext.Response.Headers[name] = value;
        base.OnResultExecuting(context);
    }
}
