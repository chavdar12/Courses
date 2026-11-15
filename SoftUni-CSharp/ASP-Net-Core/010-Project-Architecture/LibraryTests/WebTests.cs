using System.Net;

namespace LibraryTests;

public class WebTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        factory = new WebApplicationFactory<Program>();
        client = factory.CreateClient();
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task MvcListsBooksSortedThroughAllLayers()
    {
        var html = await client.GetStringAsync("/");

        Assert.That(html, Does.Match("Guards! Guards!</a> by Terry Pratchett[\\s\\S]*Mort</a>"));
    }

    [Test]
    public async Task MvcDetailsAndNotFound()
    {
        Assert.That(await client.GetStringAsync("/Books/Details/1"), Does.Contain("<h1>Mort (1987)</h1>"));
        Assert.That((await client.GetAsync("/Books/Details/99")).StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task RazorPageRunsBesideMvc()
    {
        Assert.That(await client.GetStringAsync("/Authors"), Does.Contain("Terry Pratchett (2 books)"));
    }
}
