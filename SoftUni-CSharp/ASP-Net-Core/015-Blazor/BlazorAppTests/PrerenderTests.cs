namespace BlazorAppTests;

// The real app: pages are prerendered to HTML on the server before the circuit connects.
public class PrerenderTests
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
    public async Task CounterIsPrerenderedWithLayoutAndBlazorScript()
    {
        var html = await client.GetStringAsync("/counter");

        Assert.That(html, Does.Contain("Current count: 0"));
        Assert.That(html, Does.Contain("<title>Counter</title>"));
        Assert.That(html, Does.Contain("href=\"todos\">Todos</a>"));
        Assert.That(html, Does.Match("_framework/blazor\\.web(\\.[a-z0-9]+)?\\.js"));
    }
}
