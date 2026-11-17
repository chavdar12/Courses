using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace AppFlowTests;

public class AppFlowTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        // Production environment, so the exception handler (not the developer page) runs.
        factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b.UseEnvironment("Production"));
        client = factory.CreateClient();
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task ConfigurationAndMiddlewareShapeTheResponse()
    {
        var response = await client.GetAsync("/");
        var id = response.Headers.GetValues("X-Request-Id").Single();

        Assert.That(await response.Content.ReadAsStringAsync(), Is.EqualTo($"Application Flow Demo ({id})"));
        Assert.That(response.Headers.GetValues("X-Pipeline").Single(), Is.EqualTo("inline"));
    }

    [Test]
    public async Task RequestIdMiddlewareKeepsCallerId()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/");
        request.Headers.Add("X-Request-Id", "abc");

        var response = await client.SendAsync(request);

        Assert.That(response.Headers.GetValues("X-Request-Id").Single(), Is.EqualTo("abc"));
    }

    [Test]
    public async Task ServiceLifetimesBehaveAsRegistered()
    {
        var first = await client.GetFromJsonAsync<JsonElement>("/Home/Lifetimes");
        var second = await client.GetFromJsonAsync<JsonElement>("/Home/Lifetimes");

        Assert.That(first.GetProperty("transientSame").GetBoolean(), Is.False);
        Assert.That(first.GetProperty("scopedSame").GetBoolean(), Is.True);
        Assert.That(first.GetProperty("scoped").GetGuid(), Is.Not.EqualTo(second.GetProperty("scoped").GetGuid()));
        Assert.That(first.GetProperty("singleton").GetGuid(), Is.EqualTo(second.GetProperty("singleton").GetGuid()));
    }

    [Test]
    public async Task GlobalAndAttributeFiltersAddHeaders()
    {
        var response = await client.GetAsync("/Home/Header");

        Assert.That(response.Headers.GetValues("X-Author").Single(), Is.EqualTo("SoftUni"));
        Assert.That(int.Parse(response.Headers.GetValues("X-Action-Ms").Single()), Is.GreaterThanOrEqualTo(0));
    }

    [Test]
    public async Task ServiceFilterGatesActionsByConfiguredFeature()
    {
        Assert.That(await client.GetStringAsync("/Home/Reports"), Is.EqualTo("Reports are on"));

        var beta = await client.GetAsync("/Home/Beta");
        Assert.That(beta.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task ExceptionHandlerRendersErrorPage()
    {
        var response = await client.GetAsync("/Home/Crash");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.InternalServerError));
        Assert.That(await response.Content.ReadAsStringAsync(), Does.Contain("Failed path: /Home/Crash"));
    }

    [Test]
    public async Task StatusCodePagesReExecuteKeepsOriginalCode()
    {
        var response = await client.GetAsync("/no/such/page");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
        Assert.That(await response.Content.ReadAsStringAsync(), Does.Contain("Page not found"));
    }
}
