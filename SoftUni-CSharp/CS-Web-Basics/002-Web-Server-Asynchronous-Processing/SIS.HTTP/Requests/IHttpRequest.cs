using SIS.HTTP.Enums;
using SIS.HTTP.Headers;

namespace SIS.HTTP.Requests;

public interface IHttpRequest
{
    string Path { get; }

    string Url { get; }

    Dictionary<string, string> FormData { get; }

    Dictionary<string, string> QueryData { get; }

    IHttpHeaderCollection Headers { get; }

    HttpRequestMethod RequestMethod { get; }
}
