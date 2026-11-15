using System.Net;
using SIS.HTTP.Cookies;
using SIS.HTTP.Enums;
using SIS.HTTP.Exceptions;
using SIS.HTTP.Headers;
using SIS.HTTP.Sessions;

namespace SIS.HTTP.Requests;

public class HttpRequest : IHttpRequest
{
    public HttpRequest(string requestString)
    {
        if (string.IsNullOrWhiteSpace(requestString)) throw new BadRequestException();

        var parts = requestString.Split(HttpProtocol.NewLine + HttpProtocol.NewLine, 2);
        var lines = parts[0].Split(HttpProtocol.NewLine);

        ParseRequestLine(lines[0]);
        ParseHeaders(lines.Skip(1));
        ParseCookies();
        ParseData(QueryData, Url.Split('#')[0].Split('?', 2).ElementAtOrDefault(1));
        ParseData(FormData, parts.ElementAtOrDefault(1));
    }

    public string Path { get; private set; }

    public string Url { get; private set; }

    public Dictionary<string, string> FormData { get; } = new();

    public Dictionary<string, string> QueryData { get; } = new();

    public IHttpHeaderCollection Headers { get; } = new HttpHeaderCollection();

    public HttpRequestMethod RequestMethod { get; private set; }

    public IHttpCookieCollection Cookies { get; } = new HttpCookieCollection();

    public IHttpSession Session { get; set; }

    // "<method> <url> HTTP/1.1"
    private void ParseRequestLine(string requestLine)
    {
        var tokens = requestLine.Split(' ');
        if (tokens.Length != 3 || tokens[2] != HttpProtocol.Version) throw new BadRequestException();

        if (!Enum.TryParse(tokens[0], true, out HttpRequestMethod method) || !Enum.IsDefined(method)) throw new BadRequestException();

        RequestMethod = method;
        Url = tokens[1];
        Path = Url.Split('?', '#')[0];
    }

    private void ParseHeaders(IEnumerable<string> lines)
    {
        foreach (var line in lines.Where(line => line.Length > 0))
        {
            var header = line.Split(':', 2);
            if (header.Length != 2) throw new BadRequestException();

            Headers.AddHeader(new HttpHeader(header[0].Trim(), header[1].Trim()));
        }

        if (!Headers.ContainsHeader(HttpHeader.Host)) throw new BadRequestException();
    }

    // "Cookie: key=value; key2=value2"
    private void ParseCookies()
    {
        var header = Headers.GetHeader(HttpHeader.Cookie);
        if (header == null) return;

        foreach (var pair in header.Value.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var keyValue = pair.Split('=', 2);
            if (keyValue.Length == 2) Cookies.AddCookie(new HttpCookie(keyValue[0], keyValue[1], false));
        }
    }

    // "key=value&key2=value2", URL encoded (query string and form body share the format).
    private static void ParseData(Dictionary<string, string> data, string encoded)
    {
        if (string.IsNullOrEmpty(encoded)) return;

        foreach (var pair in encoded.Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var keyValue = pair.Split('=', 2);
            data[WebUtility.UrlDecode(keyValue[0])] = WebUtility.UrlDecode(keyValue.ElementAtOrDefault(1) ?? "");
        }
    }
}
