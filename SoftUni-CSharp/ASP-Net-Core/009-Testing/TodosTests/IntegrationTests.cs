using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Todos.Data;

namespace TodosTests;

// Integration tests: the whole app in memory, from HTTP request to rendered HTML.
public class IntegrationTests
{
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [SetUp]
    public void SetUp()
    {
        // ConfigureTestServices runs after Program's registrations: the place to seed or swap services.
        factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
            b.ConfigureTestServices(services => services.AddHostedService<Seeder>())
        );
        client = factory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });
    }

    [TearDown]
    public void TearDown()
    {
        client.Dispose();
        factory.Dispose();
    }

    [Test]
    public async Task IndexRendersSeededTodos()
    {
        var response = await client.GetAsync("/");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(response.Content.Headers.ContentType!.MediaType, Is.EqualTo("text/html"));
        Assert.That(await response.Content.ReadAsStringAsync(), Does.Contain("Seeded todo"));
    }

    [Test]
    public async Task CreateThenCompleteFlow()
    {
        var created = await Post("/Todos/Create", new() { ["title"] = "Ship it" });
        Assert.That(created.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
        Assert.That(await client.GetStringAsync("/"), Does.Contain("Ship it"));

        var completed = await Post("/Todos/Complete/1", []);
        Assert.That(completed.StatusCode, Is.EqualTo(HttpStatusCode.Redirect));
        Assert.That(await client.GetStringAsync("/"), Does.Match("class=\"done\">\\s*Seeded todo"));
    }

    [Test]
    public async Task PostWithoutTokenIsRejected()
    {
        var response = await client.PostAsync(
            "/Todos/Create",
            new FormUrlEncodedContent(new Dictionary<string, string> { ["title"] = "x" })
        );

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    }

    private async Task<HttpResponseMessage> Post(string url, Dictionary<string, string> form)
    {
        var html = await client.GetStringAsync("/");
        form["__RequestVerificationToken"] = Regex
            .Match(html, "name=\"__RequestVerificationToken\" type=\"hidden\" value=\"([^\"]+)\"")
            .Groups[1]
            .Value;
        return await client.PostAsync(url, new FormUrlEncodedContent(form));
    }

    private class Seeder(IServiceProvider services) : Microsoft.Extensions.Hosting.IHostedService
    {
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
            db.Todos.Add(new Todo { Title = "Seeded todo" });
            await db.SaveChangesAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
