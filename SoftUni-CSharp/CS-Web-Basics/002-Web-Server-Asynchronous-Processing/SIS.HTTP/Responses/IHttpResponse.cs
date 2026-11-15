using System.Net;
using SIS.HTTP.Headers;

namespace SIS.HTTP.Responses;

public interface IHttpResponse
{
    HttpStatusCode StatusCode { get; set; }

    IHttpHeaderCollection Headers { get; }

    byte[] Content { get; set; }

    void AddHeader(HttpHeader header);

    byte[] GetBytes();
}
