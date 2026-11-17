using System.Net;
using System.Net.Sockets;
using System.Text;
using SIS.Demo;
using SIS.WebServer;

namespace AsynchronousProcessingTests;

// Runs the demo app on a free local port and talks to it over real TCP.
public class ServerTests
{
    private Server server;
    private HttpClient client;
    private int port;

    [OneTimeSetUp]
    public void StartServer()
    {
        var probe = new TcpListener(IPAddress.Loopback, 0);
        probe.Start();
        port = ((IPEndPoint)probe.LocalEndpoint).Port;
        probe.Stop();

        server = new Server(port, Launcher.Routes());
        _ = server.RunAsync();
        client = new HttpClient { BaseAddress = new Uri($"http://127.0.0.1:{port}") };
    }

    [OneTimeTearDown]
    public void StopServer()
    {
        server.Stop();
        client.Dispose();
    }

    [Test]
    public async Task HomeSaysHelloWorld()
    {
        var response = await client.GetAsync("/");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(response.Content.Headers.ContentType!.MediaType, Is.EqualTo("text/html"));
        Assert.That(await response.Content.ReadAsStringAsync(), Is.EqualTo("<h1>Hello, World!</h1>"));
    }

    [Test]
    public async Task UnknownRouteIsNotFound()
    {
        var response = await client.GetAsync("/missing");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
        Assert.That(
            await response.Content.ReadAsStringAsync(),
            Is.EqualTo("Route with method Get and path \"/missing\" not found.")
        );
    }

    [Test]
    public async Task ServesManyClientsConcurrently()
    {
        var responses = await Task.WhenAll(Enumerable.Range(0, 50).Select(_ => client.GetAsync("/")));

        Assert.That(responses.Select(r => r.StatusCode), Is.All.EqualTo(HttpStatusCode.OK));
    }

    [Test]
    public async Task MalformedRequestIsBadRequest()
    {
        using var tcp = new TcpClient();
        await tcp.ConnectAsync(IPAddress.Loopback, port);
        var stream = tcp.GetStream();
        await stream.WriteAsync(Encoding.UTF8.GetBytes("NONSENSE\r\n\r\n"));

        var response = await new StreamReader(stream).ReadToEndAsync();

        Assert.That(response, Does.StartWith("HTTP/1.1 400 Bad Request\r\n"));
    }
}
