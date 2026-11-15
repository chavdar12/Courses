using System.Net;

namespace RazorViewsTests;

public class RazorViewsTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [SetUp]
    public void SetUp()
    {
        factory = new WebApplicationFactory<Program>();
        client = factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });
    }

    [TearDown]
    public void TearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task IndexUsesLayoutPartialViewComponentInjectionAndSection()
    {
        var html = await client.GetStringAsync("/");

        Assert.That(html, Does.Contain("<title>Books - Library</title>"), "layout + ViewData");
        Assert.That(html, Does.Contain("<td>CLR via C#</td>"), "partial view per row");
        Assert.That(html, Does.Contain("Longest: <strong>CLR via C#</strong>"), "@inject service");
        Assert.That(html, Does.Contain("Library: 2 books, 1360 pages"), "view component");
        Assert.That(html, Does.Match("<footer>\\s*<small>Rendered at \\d{4}</small>"), "section");
    }

    [Test]
    public async Task CreateFormMixesTagHelpersAndHtmlHelpers()
    {
        var html = await client.GetStringAsync("/Books/Create");

        Assert.That(html, Does.Contain("<form method=\"post\" action=\"/Books/Create\">"));
        Assert.That(html, Does.Contain("data-val-required=\"The Title field is required.\""));
        Assert.That(html, Does.Contain("id=\"Pages\" name=\"Pages\" type=\"number\""));
        Assert.That(html, Does.Contain("__RequestVerificationToken"));
    }

    [Test]
    public async Task ValidPostAddsBookAndRedirects()
    {
        var response = await Post(new() { ["Title"] = "Refactoring", ["Author"] = "Martin Fowler", ["Pages"] = "448" });

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
        Assert.That(await client.GetStringAsync("/"), Does.Contain("<td>Refactoring</td>").And.Contain("3 books"));
    }

    [Test]
    public async Task InvalidPostRedisplaysFormWithErrors()
    {
        var response = await Post(new() { ["Title"] = "X", ["Author"] = "", ["Pages"] = "0" });
        var html = await response.Content.ReadAsStringAsync();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(html, Does.Contain("The Author field is required."));
        Assert.That(html, Does.Contain("The field Pages must be between 1 and 2000."));
    }

    [Test]
    public async Task PostWithoutAntiForgeryTokenIsRejected()
    {
        var response = await client.PostAsync("/Books/Create", new FormUrlEncodedContent(new Dictionary<string, string> { ["Title"] = "Hack" }));

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    }

    private async Task<HttpResponseMessage> Post(Dictionary<string, string> form)
    {
        form["__RequestVerificationToken"] = await AntiForgery.GetTokenAsync(client, "/Books/Create");
        return await client.PostAsync("/Books/Create", new FormUrlEncodedContent(form));
    }
}
