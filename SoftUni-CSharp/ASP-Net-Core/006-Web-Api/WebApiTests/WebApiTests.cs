using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using WebApi.Data;

namespace WebApiTests;

public class WebApiTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    // Fresh app per test: the in-memory database lives in the app's service provider.
    [SetUp]
    public void SetUp()
    {
        factory = new WebApplicationFactory<Program>();
        client = factory.CreateClient();
    }

    [TearDown]
    public void TearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task GetAllReturnsSeededProducts()
    {
        var products = await client.GetFromJsonAsync<List<Product>>("/api/products");

        Assert.That(products.Select(p => p.Name), Is.EqualTo(new[] { "Coffee", "Tea" }));
    }

    [Test]
    public async Task FullCrudRoundTrip()
    {
        var created = await client.PostAsJsonAsync("/api/products", new { name = "Juice", price = 2.2m });
        Assert.That(created.StatusCode, Is.EqualTo(HttpStatusCode.Created));
        var location = created.Headers.Location;
        var juice = await created.Content.ReadFromJsonAsync<Product>();
        Assert.That(location!.AbsolutePath, Is.EqualTo($"/api/products/{juice.Id}"));

        var updated = await client.PutAsJsonAsync(location, new { name = "Orange juice", price = 2.5m });
        Assert.That(updated.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        Assert.That((await client.GetFromJsonAsync<Product>(location)).Name, Is.EqualTo("Orange juice"));

        Assert.That((await client.DeleteAsync(location)).StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        Assert.That((await client.GetAsync(location)).StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task InvalidProductGetsValidationProblemDetails()
    {
        var response = await client.PostAsJsonAsync("/api/products", new { name = "", price = 0 });
        var problem = await response.Content.ReadFromJsonAsync<JsonElement>();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That(response.Content.Headers.ContentType!.MediaType, Is.EqualTo("application/problem+json"));
        Assert.That(
            problem.GetProperty("errors").EnumerateObject().Select(e => e.Name),
            Is.EquivalentTo(new[] { "Name", "Price" })
        );
    }

    [Test]
    public async Task MissingProductIsProblemDetails404()
    {
        var response = await client.GetAsync("/api/products/999");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
        Assert.That(response.Content.Headers.ContentType!.MediaType, Is.EqualTo("application/problem+json"));
    }

    [Test]
    public async Task AcceptHeaderNegotiatesXml()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/api/products/1");
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));

        var xml = await (await client.SendAsync(request)).Content.ReadAsStringAsync();

        Assert.That(xml, Does.StartWith("<Product").And.Contain("<Name>Coffee</Name>"));
    }

    [TestCase("http://localhost:4200", true)]
    [TestCase("https://evil.example", false)]
    public async Task CorsAllowsOnlyConfiguredOrigins(string origin, bool allowed)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/api/products");
        request.Headers.Add("Origin", origin);

        var response = await client.SendAsync(request);

        Assert.That(response.Headers.Contains("Access-Control-Allow-Origin"), Is.EqualTo(allowed));
    }

    [Test]
    public async Task RootServesTheAjaxClient()
    {
        Assert.That(await client.GetStringAsync("/"), Does.Contain("fetch('/api/products')"));
    }
}
