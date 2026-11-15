using System.Net;
using System.Text.RegularExpressions;
using Advanced.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AdvancedTests;

public class AdvancedTests
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
    public async Task MemoryCacheComputesOncePerKey()
    {
        var first = await client.GetStringAsync("/Home/Weather?city=Varna");
        var second = await client.GetStringAsync("/Home/Weather?city=Varna");
        await client.GetStringAsync("/Home/Weather?city=Plovdiv");

        Assert.That(second, Is.EqualTo(first));
        Assert.That(factory.Services.GetRequiredService<WeatherService>().Calls, Is.EqualTo(2));
    }

    [Test]
    public async Task ResponseCacheReplaysPerQueryKey()
    {
        var first = await client.GetAsync("/Home/Cached?id=1");
        var again = await client.GetStringAsync("/Home/Cached?id=1");
        var other = await client.GetStringAsync("/Home/Cached?id=2");

        Assert.That(first.Headers.CacheControl!.MaxAge, Is.EqualTo(TimeSpan.FromSeconds(60)));
        Assert.That(again, Is.EqualTo(await first.Content.ReadAsStringAsync()));
        Assert.That(other, Does.StartWith("2:"));
    }

    [Test]
    public async Task SessionCountsPerBrowser()
    {
        await client.GetStringAsync("/Home/Visits");
        Assert.That(await client.GetStringAsync("/Home/Visits"), Is.EqualTo("2"));

        using var otherBrowser = factory.CreateClient();
        Assert.That(await otherBrowser.GetStringAsync("/Home/Visits"), Is.EqualTo("1"));
    }

    [Test]
    public async Task TempDataShowsOnceAfterRedirect()
    {
        var token = Regex
            .Match(
                await client.GetStringAsync("/"),
                "name=\"__RequestVerificationToken\" type=\"hidden\" value=\"([^\"]+)\""
            )
            .Groups[1]
            .Value;
        var post = await client.PostAsync(
            "/Home/Save",
            new FormUrlEncodedContent(new Dictionary<string, string> { ["__RequestVerificationToken"] = token })
        );
        Assert.That(post.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));

        Assert.That(await client.GetStringAsync("/"), Does.Contain("Saved!"));
        Assert.That(await client.GetStringAsync("/"), Does.Not.Contain("Saved!"));
    }

    [Test]
    public async Task AreaRoutesToItsOwnController()
    {
        Assert.That(
            await client.GetStringAsync("/Admin/Dashboard"),
            Is.EqualTo("Admin dashboard (/ is the public site)")
        );
        Assert.That(await client.GetStringAsync("/Admin"), Does.StartWith("Admin dashboard"));
    }

    [Test]
    public async Task NonEssentialCookiesWaitForConsent()
    {
        Assert.That(await client.GetStringAsync("/"), Does.Contain("id=\"cookie-consent\""));
        var before = await client.GetAsync("/Home/Theme?value=dark");
        Assert.That(await before.Content.ReadAsStringAsync(), Is.EqualTo("needs consent"));
        Assert.That(before.Headers.Contains("Set-Cookie"), Is.False);

        await client.GetAsync("/Home/Consent");

        var after = await client.GetAsync("/Home/Theme?value=dark");
        Assert.That(await after.Content.ReadAsStringAsync(), Is.EqualTo("stored"));
        Assert.That(after.Headers.GetValues("Set-Cookie"), Has.Some.StartsWith("theme=dark"));
        Assert.That(await client.GetStringAsync("/"), Does.Not.Contain("id=\"cookie-consent\""));
    }

    [Test]
    public async Task LargeResponsesAreGzipped()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/Home/Big");
        request.Headers.Add("Accept-Encoding", "gzip");

        var response = await client.SendAsync(request);

        Assert.That(response.Content.Headers.ContentEncoding, Is.EqualTo(new[] { "gzip" }));
    }

    [Test]
    public async Task PageHasSeoMetadata()
    {
        var html = await client.GetStringAsync("/");

        Assert.That(
            html,
            Does.Contain("<meta name=\"description\"").And.Contain("<link rel=\"canonical\" href=\"http://localhost/\"")
        );
    }
}
