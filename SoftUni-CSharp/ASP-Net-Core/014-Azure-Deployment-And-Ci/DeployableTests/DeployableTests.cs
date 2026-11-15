using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace DeployableTests;

public class DeployableTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        // Settings the pipeline would inject as App Service configuration.
        factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b
            .UseEnvironment("Production")
            .UseSetting("Build:Version", "abc123"));
        client = factory.CreateClient();
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task HealthEndpointReportsHealthy()
    {
        var response = await client.GetAsync("/health");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(await response.Content.ReadAsStringAsync(), Is.EqualTo("Healthy"));
    }

    [Test]
    public async Task RootReportsEnvironmentAndInjectedVersion()
    {
        var info = await client.GetFromJsonAsync<JsonElement>("/");

        Assert.That(info.GetProperty("environment").GetString(), Is.EqualTo("Production"));
        Assert.That(info.GetProperty("version").GetString(), Is.EqualTo("abc123"));
    }

    [Test]
    public async Task ForwardedProtoFromTheProxyIsHonoured()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/");
        request.Headers.Add("X-Forwarded-Proto", "https");

        var info = await (await client.SendAsync(request)).Content.ReadFromJsonAsync<JsonElement>();

        Assert.That(info.GetProperty("scheme").GetString(), Is.EqualTo("https"));
    }
}
