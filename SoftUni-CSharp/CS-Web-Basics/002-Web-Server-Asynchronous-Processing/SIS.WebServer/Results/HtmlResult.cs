using System.Net;

namespace SIS.WebServer.Results;

public class HtmlResult : TextResult
{
    public HtmlResult(string content, HttpStatusCode statusCode)
        : base(content, statusCode, "text/html; charset=utf-8") { }
}
