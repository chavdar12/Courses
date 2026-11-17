using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace WorkingWithDataTests;

public class WorkingWithDataTests
{
    private string uploads;
    private WebApplicationFactory<Program> factory;
    private HttpClient client;

    [SetUp]
    public void SetUp()
    {
        uploads = Directory.CreateTempSubdirectory().FullName;
        factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b.UseSetting("UploadsPath", uploads));
        client = factory.CreateClient();
    }

    [TearDown]
    public void TearDown()
    {
        client.Dispose();
        factory.Dispose();
        Directory.Delete(uploads, true);
    }

    [Test]
    public async Task ParametersBindFromRouteQueryHeaderAndForm()
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, "/binding/sources/7?sort=asc")
        {
            Content = new FormUrlEncodedContent(new Dictionary<string, string> { ["name"] = "Pesho" }),
        };
        request.Headers.Add("X-Client", "tests");

        var json = await (await client.SendAsync(request)).Content.ReadFromJsonAsync<JsonElement>();

        Assert.That(
            json.GetRawText(),
            Is.EqualTo("{\"id\":7,\"sort\":\"asc\",\"client\":\"tests\",\"name\":\"Pesho\"}")
        );
    }

    [Test]
    public async Task CustomBinderParsesStudent()
    {
        var json = await client.GetFromJsonAsync<JsonElement>("/binding/student?student=Ivan-21");

        Assert.That(json.GetProperty("name").GetString(), Is.EqualTo("Ivan"));
        Assert.That(json.GetProperty("age").GetInt32(), Is.EqualTo(21));
    }

    [Test]
    public async Task CustomBinderReportsBadFormat()
    {
        var response = await client.GetAsync("/binding/student?student=Ivan");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That(await response.Content.ReadAsStringAsync(), Does.Contain("Expected format Name-Age."));
    }

    [Test]
    public async Task ValidRegistrationPasses()
    {
        var response = await Register("pesho", "pesho@abv.bg", "secret1", "secret1", "1995-05-05");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    }

    [Test]
    public async Task InvalidRegistrationListsEveryBrokenRule()
    {
        var response = await Register("p", "not-an-email", "secret1", "other", "2015-01-01");
        var errors = (await response.Content.ReadFromJsonAsync<JsonElement>()).GetRawText();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That(errors, Does.Contain("Username").And.Contain("not a valid e-mail address"));
        Assert.That(errors, Does.Contain("You must be born before 2010."));
    }

    [Test]
    public async Task ValidatableObjectChecksPasswordsMatch()
    {
        var response = await Register("pesho", "pesho@abv.bg", "secret1", "other", "1995-05-05");

        Assert.That(await response.Content.ReadAsStringAsync(), Does.Contain("Passwords do not match."));
    }

    [Test]
    public async Task UploadedFileCanBeListedAndDownloaded()
    {
        using var form = new MultipartFormDataContent
        {
            { new ByteArrayContent("hello"u8.ToArray()), "files", "hello.txt" },
        };

        var upload = await client.PostAsync("/files", form);

        Assert.That(upload.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(await client.GetStringAsync("/files"), Is.EqualTo("[\"hello.txt\"]"));

        var download = await client.GetAsync("/files/hello.txt");
        Assert.That(download.Content.Headers.ContentDisposition!.FileName, Is.EqualTo("hello.txt"));
        Assert.That(await download.Content.ReadAsStringAsync(), Is.EqualTo("hello"));
    }

    [Test]
    public async Task UploadCannotEscapeTheUploadsFolder()
    {
        using var form = new MultipartFormDataContent
        {
            { new StringContent("x", Encoding.UTF8), "files", "../../evil.txt" },
        };

        await client.PostAsync("/files", form);

        Assert.That(File.Exists(Path.Combine(uploads, "evil.txt")), Is.True);
        Assert.That(File.Exists(Path.Combine(uploads, "..", "..", "evil.txt")), Is.False);
    }

    [Test]
    public async Task EmptyUploadAndMissingDownloadAreRejected()
    {
        using var form = new MultipartFormDataContent { { new ByteArrayContent([]), "files", "empty.txt" } };

        Assert.That((await client.PostAsync("/files", form)).StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That((await client.GetAsync("/files/missing.txt")).StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    private Task<HttpResponseMessage> Register(
        string username,
        string email,
        string password,
        string confirm,
        string birthDate
    ) =>
        client.PostAsync(
            "/binding/register",
            new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                    ["Username"] = username,
                    ["Email"] = email,
                    ["Password"] = password,
                    ["ConfirmPassword"] = confirm,
                    ["BirthDate"] = birthDate,
                }
            )
        );
}
