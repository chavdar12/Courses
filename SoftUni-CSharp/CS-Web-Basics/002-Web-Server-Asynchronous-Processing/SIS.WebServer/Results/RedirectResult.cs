using System.Net;
using SIS.HTTP.Headers;
using SIS.HTTP.Responses;

namespace SIS.WebServer.Results;

public class RedirectResult : HttpResponse
{
    public RedirectResult(string location)
        : base(HttpStatusCode.SeeOther)
    {
        AddHeader(new HttpHeader(HttpHeader.Location, location));
    }
}
