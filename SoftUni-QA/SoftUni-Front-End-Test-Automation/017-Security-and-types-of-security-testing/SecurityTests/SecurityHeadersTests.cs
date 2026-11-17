using System.Net;

namespace SecurityTests
{
    // OWASP Juice Shop is an intentionally vulnerable demo app published for security practice, so probing it is safe and allowed.
    public class SecurityHeadersTests
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

        [Test]
        public void Test_SiteIsServedOverHttps()
        {
            // HttpClient rejects invalid certificates, so a successful response proves a valid TLS certificate.
            var response = client.GetAsync("/").Result;

            Assert.That(response.RequestMessage.RequestUri.Scheme, Is.EqualTo("https"));
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }

        [Test]
        public void Test_ContentTypeSniffingIsDisabled()
        {
            var response = client.GetAsync("/").Result;

            Assert.That(response.Headers.GetValues("X-Content-Type-Options"), Has.Member("nosniff"));
        }

        [Test]
        public void Test_ClickjackingIsPrevented()
        {
            var response = client.GetAsync("/").Result;

            Assert.That(response.Headers.GetValues("X-Frame-Options"), Has.Member("SAMEORIGIN"));
        }

        [Test]
        public void Test_ProtectedApiRequiresAuthentication()
        {
            // Access control check: the user list must not be readable without a token.
            var response = client.GetAsync("/api/Users").Result;

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
        }

        [Test]
        public void Test_ServerDoesNotLeakFrameworkHeader()
        {
            var response = client.GetAsync("/").Result;

            Assert.That(response.Headers.Contains("X-Powered-By"), Is.False);
        }
    }
}
