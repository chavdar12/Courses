using SIS.HTTP.Enums;
using SIS.HTTP.Requests;
using SIS.HTTP.Responses;

namespace SIS.WebServer.Routing;

public class ServerRoutingTable
{
    private readonly Dictionary<(HttpRequestMethod, string), Func<IHttpRequest, IHttpResponse>> routes = new();

    public void Add(HttpRequestMethod method, string path, Func<IHttpRequest, IHttpResponse> handler) =>
        routes[(method, path)] = handler;

    public bool Contains(HttpRequestMethod method, string path) => routes.ContainsKey((method, path));

    public Func<IHttpRequest, IHttpResponse> Get(HttpRequestMethod method, string path) => routes[(method, path)];
}
