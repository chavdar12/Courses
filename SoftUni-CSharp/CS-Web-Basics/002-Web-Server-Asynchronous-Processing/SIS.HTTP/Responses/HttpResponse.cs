using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using SIS.HTTP.Headers;

namespace SIS.HTTP.Responses;

public class HttpResponse : IHttpResponse
{
    public HttpResponse(HttpStatusCode statusCode)
    {
        StatusCode = statusCode;
    }

    public HttpStatusCode StatusCode { get; set; }

    public IHttpHeaderCollection Headers { get; } = new HttpHeaderCollection();

    public byte[] Content { get; set; } = [];

    public void AddHeader(HttpHeader header) => Headers.AddHeader(header);

    public byte[] GetBytes() => [.. Encoding.UTF8.GetBytes(ToString()), .. Content];

    // Status line, headers and the empty line that ends them. The server closes every connection, so it says so.
    public override string ToString()
    {
        var result = new StringBuilder().Append(
            $"{HttpProtocol.Version} {(int)StatusCode} {ReasonPhrase(StatusCode)}{HttpProtocol.NewLine}"
        );

        var headers = Headers.ToString();
        if (headers.Length > 0)
            result.Append(headers + HttpProtocol.NewLine);

        return result
            .Append($"Content-Length: {Content.Length}{HttpProtocol.NewLine}")
            .Append($"Connection: close{HttpProtocol.NewLine}")
            .Append(HttpProtocol.NewLine)
            .ToString();
    }

    // NotFound -> "Not Found", OK stays "OK".
    private static string ReasonPhrase(HttpStatusCode code) =>
        Regex.Replace(code.ToString(), "(?<=[a-z])(?=[A-Z])", " ");
}
