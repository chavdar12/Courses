using System.Net;
using SIS.HTTP.Requests;
using SIS.HTTP.Responses;
using SIS.WebServer.Results;

namespace SIS.Demo;

// Counts visits in the session, so state survives between requests from the same browser.
public class HomeController
{
    private const string VisitsKey = "visits";

    public IHttpResponse Index(IHttpRequest request)
    {
        var visits = (int)(request.Session.GetParameter(VisitsKey) ?? 0) + 1;
        request.Session.AddParameter(VisitsKey, visits);

        return new HtmlResult($"<h1>Hello, World!</h1><p>Visits in this session: {visits}</p>", HttpStatusCode.OK);
    }

    public IHttpResponse Logout(IHttpRequest request)
    {
        request.Session.ClearParameters();
        return new RedirectResult("/");
    }
}
