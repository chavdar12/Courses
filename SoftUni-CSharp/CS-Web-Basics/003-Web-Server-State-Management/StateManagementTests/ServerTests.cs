using System.Net;
using System.Net.Sockets;
using SIS.Demo;
using SIS.HTTP.Sessions;
using SIS.WebServer;

namespace StateManagementTests;

// Runs the demo app on a free local port; each test gets its own browser-like client with a cookie jar.
public class ServerTests
{
    private Server server;
    private Uri baseAddress;

    [OneTimeSetUp]
    public void StartServer()
    {
        var probe = new TcpListener(IPAddress.Loopback, 0);
        probe.Start();
        var port = ((IPEndPoint)probe.LocalEndpoint).Port;
        probe.Stop();

        server = new Server(port, Launcher.Routes());
        _ = server.RunAsync();
        baseAddress = new Uri($"http://127.0.0.1:{port}");
    }

    [OneTimeTearDown]
    public void StopServer() => server.Stop();

    [Test]
    public async Task SessionCookieKeepsStateBetweenRequests()
    {
        var (client, cookies) = Browser();

        Assert.That(await client.GetStringAsync("/"), Does.Contain("Visits in this session: 1"));
        Assert.That(await client.GetStringAsync("/"), Does.Contain("Visits in this session: 2"));

        var sessionCookie = cookies.GetCookies(baseAddress)[HttpSessionStorage.SessionCookieKey];
        Assert.That(sessionCookie, Is.Not.Null);
        Assert.That(sessionCookie.HttpOnly, Is.True);
    }

    [Test]
    public async Task EachClientGetsItsOwnSession()
    {
        var (first, _) = Browser();
        var (second, _) = Browser();

        await first.GetStringAsync("/");

        Assert.That(await second.GetStringAsync("/"), Does.Contain("Visits in this session: 1"));
    }

    [Test]
    public async Task LogoutClearsTheSession()
    {
        var (client, _) = Browser();
        await client.GetStringAsync("/");

        Assert.That(
            await client.GetStringAsync("/logout"),
            Does.Contain("Visits in this session: 1"),
            "Logout should redirect home with a fresh count."
        );
    }

    [Test]
    public async Task UnknownSessionIdIsReplaced()
    {
        var (client, cookies) = Browser();
        cookies.Add(baseAddress, new Cookie(HttpSessionStorage.SessionCookieKey, "chosen-by-attacker"));

        await client.GetStringAsync("/");

        Assert.That(
            cookies.GetCookies(baseAddress)[HttpSessionStorage.SessionCookieKey]!.Value,
            Is.Not.EqualTo("chosen-by-attacker")
        );
        Assert.That(HttpSessionStorage.ContainsSession("chosen-by-attacker"), Is.False);
    }

    private (HttpClient, CookieContainer) Browser()
    {
        var cookies = new CookieContainer();
        var client = new HttpClient(new HttpClientHandler { CookieContainer = cookies }) { BaseAddress = baseAddress };
        return (client, cookies);
    }
}
