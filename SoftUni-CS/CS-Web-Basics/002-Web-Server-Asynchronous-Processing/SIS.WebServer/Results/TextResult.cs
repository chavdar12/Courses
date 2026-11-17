using System.Net;
using System.Text;
using SIS.HTTP.Headers;
using SIS.HTTP.Responses;

namespace SIS.WebServer.Results;

public class TextResult : HttpResponse
{
    public TextResult(string content, HttpStatusCode statusCode, string contentType = "text/plain; charset=utf-8")
        : base(statusCode)
    {
        AddHeader(new HttpHeader(HttpHeader.ContentType, contentType));
        Content = Encoding.UTF8.GetBytes(content);
    }
}
