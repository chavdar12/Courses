using System.Net;

namespace IntroTests;

public class IntroTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        factory = new WebApplicationFactory<Program>();
        client = factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [TestCase("/")]
    [TestCase("/Home")]
    [TestCase("/Home/Index")]
    public async Task DefaultRouteRendersHomeViewInsideLayout(string url)
    {
        var html = await client.GetStringAsync(url);

        Assert.That(html, Does.Contain("<title>Home - Intro</title>"));
        Assert.That(html, Does.Contain("Welcome to ASP.NET Core MVC"));
    }

    [Test]
    public async Task ActionResultsPickTheResponseFormat()
    {
        Assert.That(await client.GetStringAsync("/Home/About"), Is.EqualTo("ASP.NET Core MVC intro"));

        var json = await client.GetAsync("/Home/Time");
        Assert.That(json.Content.Headers.ContentType!.MediaType, Is.EqualTo("application/json"));

        var redirect = await client.GetAsync("/Home/Docs");
        Assert.That(redirect.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
    }

    [Test]
    public async Task AttributeRouteListsAndShowsProducts()
    {
        var list = await client.GetStringAsync("/products");
        Assert.That(list, Does.Contain("<a href=\"/products/2\">Mouse</a>"));

        var details = await client.GetStringAsync("/products/3");
        Assert.That(details, Does.Contain("<h1>Monitor</h1>").And.Contain("249.00"));
    }

    [TestCase("/products/99")]
    [TestCase("/products/abc")]
    public async Task UnknownOrInvalidProductIsNotFound(string url)
    {
        var response = await client.GetAsync(url);

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task StaticFilesAreServedFromWwwroot()
    {
        var response = await client.GetAsync("/css/site.css");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(response.Content.Headers.ContentType!.MediaType, Is.EqualTo("text/css"));
    }
}
