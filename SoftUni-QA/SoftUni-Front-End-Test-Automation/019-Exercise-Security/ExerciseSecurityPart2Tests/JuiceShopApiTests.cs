using System.Net;
using System.Text;
using System.Text.Json;

namespace ExerciseSecurityPart2
{
    // OWASP Juice Shop is an intentionally vulnerable demo app published for security practice, so these API security checks are safe and allowed.
    public class JuiceShopApiTests
    {
        private const string BaseUrl = "https://demo.owasp-juice.shop";

        private HttpClient client;

        [OneTimeSetUp]
        public void Setup()
        {
            client = new HttpClient { BaseAddress = new Uri(BaseUrl), Timeout = TimeSpan.FromSeconds(15) };

            try
            {
                client.GetAsync("/").Result.EnsureSuccessStatusCode();
            }
            catch (Exception e) when (e is AggregateException or HttpRequestException)
            {
                Assert.Ignore($"{BaseUrl} is not reachable.");
            }
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            client?.Dispose();
        }

        private JsonElement PostLogin(string email, string password)
        {
            var payload = JsonSerializer.Serialize(new { email, password });
            var response = client
                .PostAsync("/rest/user/login", new StringContent(payload, Encoding.UTF8, "application/json"))
                .Result;
            var body = response.Content.ReadAsStringAsync().Result;
            return JsonDocument.Parse(body).RootElement;
        }

        [Test]
        public void Test_LoginWithWrongCredentials_ReturnsUnauthorized()
        {
            var payload = JsonSerializer.Serialize(new { email = "nobody@example.com", password = "wrong" });
            var response = client
                .PostAsync("/rest/user/login", new StringContent(payload, Encoding.UTF8, "application/json"))
                .Result;

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
        }

        [Test]
        public void Test_LoginEndpoint_IsVulnerableToSqlInjection()
        {
            // Known vulnerability: the login query is not parameterised, so this payload returns the admin's token.
            // A hardened endpoint would answer 401 here; this test documents that it does not.
            var root = PostLogin("' OR 1=1--", "anything");

            Assert.That(
                root.TryGetProperty("authentication", out var auth),
                Is.True,
                "SQL injection should NOT yield a session; this asserts the known vulnerability is present."
            );
            Assert.That(auth.GetProperty("token").GetString(), Is.Not.Empty);
        }

        [Test]
        public void Test_ProductSearch_IsVulnerableToSqlInjection()
        {
            // A closing-paren payload breaks out of the WHERE clause and returns every product instead of a filtered set.
            var injected = client
                .GetAsync("/rest/products/search?q=%27%29%29--")
                .Result.Content.ReadAsStringAsync()
                .Result;
            var empty = client.GetAsync("/rest/products/search?q=zzzzzz").Result.Content.ReadAsStringAsync().Result;

            int injectedCount = JsonDocument.Parse(injected).RootElement.GetProperty("data").GetArrayLength();
            int emptyCount = JsonDocument.Parse(empty).RootElement.GetProperty("data").GetArrayLength();

            Assert.That(
                injectedCount,
                Is.GreaterThan(emptyCount),
                "Injection should NOT return more rows than a normal query; this asserts the known vulnerability is present."
            );
        }

        [Test]
        public void Test_UserListEndpoint_RequiresAuthentication()
        {
            // Access-control check: /api/Users must stay protected.
            var response = client.GetAsync("/api/Users").Result;

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
        }
    }
}
