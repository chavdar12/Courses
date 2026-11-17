using SIS.HTTP.Enums;
using SIS.WebServer;
using SIS.WebServer.Routing;

namespace SIS.Demo;

public static class Launcher
{
    public const int Port = 8000;

    public static ServerRoutingTable Routes()
    {
        var routes = new ServerRoutingTable();
        routes.Add(HttpRequestMethod.Get, "/", request => new HomeController().Index(request));
        routes.Add(HttpRequestMethod.Get, "/logout", request => new HomeController().Logout(request));
        return routes;
    }

    // Open http://localhost:8000 in the browser.
    public static async Task Main() => await new Server(Port, Routes()).RunAsync();
}
