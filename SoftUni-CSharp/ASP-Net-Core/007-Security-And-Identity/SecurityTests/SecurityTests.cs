using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace SecurityTests;

public class SecurityTests
{
    private const string Password = "Passw0rd!";

    private WebApplicationFactory<Program> factory;

    [SetUp]
    public void SetUp() => factory = new WebApplicationFactory<Program>();

    [TearDown]
    public void TearDown() => factory.Dispose();

    [Test]
    public async Task ProtectedEndpointNeedsSignIn()
    {
        using var client = factory.CreateClient();

        Assert.That((await client.GetAsync("/api/secure/me")).StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
    }

    [Test]
    public async Task RegisterLoginLogoutWithCookie()
    {
        using var client = factory.CreateClient();
        await Register(client, "pesho@abv.bg");

        Assert.That((await Login(client, "pesho@abv.bg", Password)).StatusCode, Is.EqualTo(HttpStatusCode.OK));
        var me = await client.GetFromJsonAsync<JsonElement>("/api/secure/me");
        Assert.That(me.GetProperty("name").GetString(), Is.EqualTo("pesho@abv.bg"));

        await client.PostAsync("/api/account/logout", null);
        Assert.That((await client.GetAsync("/api/secure/me")).StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
    }

    [Test]
    public async Task WeakPasswordAndWrongPasswordAreRejected()
    {
        using var client = factory.CreateClient();

        var weak = await client.PostAsJsonAsync(
            "/api/account/register",
            new
            {
                email = "a@b.c",
                password = "123",
                fullName = "A",
            }
        );
        Assert.That(weak.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That(await weak.Content.ReadAsStringAsync(), Does.Contain("PasswordTooShort"));

        await Register(client, "pesho@abv.bg");
        Assert.That(
            (await Login(client, "pesho@abv.bg", "Wrong123!")).StatusCode,
            Is.EqualTo(HttpStatusCode.Unauthorized)
        );
    }

    [Test]
    public async Task RolesSeparateAdminsFromUsers()
    {
        using var user = factory.CreateClient();
        await Register(user, "pesho@abv.bg");
        await Login(user, "pesho@abv.bg", Password);
        Assert.That((await user.GetAsync("/api/secure/admin")).StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));

        using var admin = factory.CreateClient();
        await Login(admin, "admin@site.com", "Admin123!");
        Assert.That(await admin.GetStringAsync("/api/secure/admin"), Does.Contain("Welcome, admin"));
    }

    [Test]
    public async Task JwtAuthenticatesWithRoleClaims()
    {
        using var client = factory.CreateClient();
        var response = await client.PostAsJsonAsync(
            "/api/account/token",
            new { email = "admin@site.com", password = "Admin123!" }
        );
        var token = (await response.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("token").GetString();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        Assert.That(await client.GetStringAsync("/api/secure/admin"), Does.Contain("Welcome, admin"));
    }

    [Test]
    public async Task TamperedJwtIsRejected()
    {
        using var client = factory.CreateClient();
        var response = await client.PostAsJsonAsync(
            "/api/account/token",
            new { email = "admin@site.com", password = "Admin123!" }
        );
        var token = (await response.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("token").GetString();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token[..^2] + "xx");

        Assert.That((await client.GetAsync("/api/secure/me")).StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
    }

    [Test]
    public async Task ClaimPolicyOpensAfterAdminGrantsClaim()
    {
        using var user = factory.CreateClient();
        var id = await Register(user, "pesho@abv.bg");
        await Login(user, "pesho@abv.bg", Password);
        Assert.That((await user.GetAsync("/api/secure/payroll")).StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));

        using var admin = factory.CreateClient();
        await Login(admin, "admin@site.com", "Admin123!");
        await admin.PostAsync($"/api/secure/employees/{id}?number=42", null);

        // Claims are baked into the cookie at sign-in, so sign in again to pick up the new one.
        await Login(user, "pesho@abv.bg", Password);
        Assert.That(await user.GetStringAsync("/api/secure/payroll"), Does.Contain("Employee #42"));
    }

    [Test]
    public async Task UsersCannotReadOtherProfilesByChangingTheId()
    {
        using var pesho = factory.CreateClient();
        var peshoId = await Register(pesho, "pesho@abv.bg");
        using var gosho = factory.CreateClient();
        var goshoId = await Register(gosho, "gosho@abv.bg");
        await Login(pesho, "pesho@abv.bg", Password);

        Assert.That((await pesho.GetAsync($"/api/secure/profile/{peshoId}")).StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(
            (await pesho.GetAsync($"/api/secure/profile/{goshoId}")).StatusCode,
            Is.EqualTo(HttpStatusCode.Forbidden)
        );
    }

    [Test]
    public async Task CommentsAreHtmlEncodedAndNeedAntiForgeryToken()
    {
        using var client = factory.CreateClient();

        var noToken = await client.PostAsync(
            "/",
            new FormUrlEncodedContent(new Dictionary<string, string> { ["text"] = "hi" })
        );
        Assert.That(noToken.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));

        var token = Regex
            .Match(
                await client.GetStringAsync("/"),
                "name=\"__RequestVerificationToken\" type=\"hidden\" value=\"([^\"]+)\""
            )
            .Groups[1]
            .Value;
        await client.PostAsync(
            "/",
            new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                    ["text"] = "<script>alert(1)</script>",
                    ["__RequestVerificationToken"] = token,
                }
            )
        );

        var html = await client.GetStringAsync("/");
        Assert.That(html, Does.Contain("&lt;script&gt;alert(1)&lt;/script&gt;"));
        Assert.That(html, Does.Not.Contain("<script>alert(1)</script>"));
    }

    private static async Task<string> Register(HttpClient client, string email)
    {
        var response = await client.PostAsJsonAsync(
            "/api/account/register",
            new
            {
                email,
                password = Password,
                fullName = email,
            }
        );
        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetString();
    }

    private static Task<HttpResponseMessage> Login(HttpClient client, string email, string password) =>
        client.PostAsJsonAsync("/api/account/login", new { email, password });
}
