using System.Net;
using SIS.HTTP.Cookies;
using SIS.HTTP.Headers;

namespace SIS.HTTP.Responses;

public interface IHttpResponse
{
    HttpStatusCode StatusCode { get; set; }

    IHttpHeaderCollection Headers { get; }

    byte[] Content { get; set; }

    IHttpCookieCollection Cookies { get; }

    void AddHeader(HttpHeader header);

    void AddCookie(HttpCookie cookie);

    byte[] GetBytes();
}
