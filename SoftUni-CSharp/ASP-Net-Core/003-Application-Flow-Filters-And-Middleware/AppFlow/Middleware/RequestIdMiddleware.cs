namespace AppFlow.Middleware;

// Reuses the caller's X-Request-Id or creates one, and echoes it on the response.
public class RequestIdMiddleware(RequestDelegate next)
{
    public const string Header = "X-Request-Id";

    public async Task InvokeAsync(HttpContext context)
    {
        var id = context.Request.Headers[Header].FirstOrDefault() ?? Guid.NewGuid().ToString("N");
        context.Items[Header] = id;
        context.Response.OnStarting(() =>
        {
            context.Response.Headers[Header] = id;
            return Task.CompletedTask;
        });

        await next(context);
    }
}

public static class RequestIdMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestId(this IApplicationBuilder app) =>
        app.UseMiddleware<RequestIdMiddleware>();
}
