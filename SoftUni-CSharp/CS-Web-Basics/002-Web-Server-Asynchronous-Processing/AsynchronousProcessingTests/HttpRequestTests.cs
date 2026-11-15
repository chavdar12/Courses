using SIS.HTTP.Enums;
using SIS.HTTP.Exceptions;
using SIS.HTTP.Requests;

namespace AsynchronousProcessingTests;

public class HttpRequestTests
{
    [Test]
    public void ParsesGetWithQueryString()
    {
        var request = new HttpRequest("GET /search?q=C%23+.NET&lang=en#top HTTP/1.1\r\nHost: localhost\r\nUser-Agent: test\r\n\r\n");

        Assert.That(request.RequestMethod, Is.EqualTo(HttpRequestMethod.Get));
        Assert.That(request.Url, Is.EqualTo("/search?q=C%23+.NET&lang=en#top"));
        Assert.That(request.Path, Is.EqualTo("/search"));
        Assert.That(request.QueryData, Is.EqualTo(new Dictionary<string, string> { ["q"] = "C# .NET", ["lang"] = "en" }));
        Assert.That(request.Headers.GetHeader("user-agent").Value, Is.EqualTo("test"));
    }

    [Test]
    public void ParsesPostFormData()
    {
        var request = new HttpRequest("POST /login HTTP/1.1\r\nHost: localhost\r\nContent-Length: 23\r\n\r\nname=Maria+Smith&age=19");

        Assert.That(request.RequestMethod, Is.EqualTo(HttpRequestMethod.Post));
        Assert.That(request.FormData, Is.EqualTo(new Dictionary<string, string> { ["name"] = "Maria Smith", ["age"] = "19" }));
    }

    [TestCase("")]
    [TestCase("GET / HTTP/1.1\r\n\r\n")]
    [TestCase("GET / HTTP/1.0\r\nHost: localhost\r\n\r\n")]
    [TestCase("FETCH / HTTP/1.1\r\nHost: localhost\r\n\r\n")]
    [TestCase("7 / HTTP/1.1\r\nHost: localhost\r\n\r\n")]
    [TestCase("GET /\r\nHost: localhost\r\n\r\n")]
    [TestCase("GET / HTTP/1.1\r\nbroken header\r\n\r\n")]
    public void RejectsMalformedRequests(string requestString)
    {
        Assert.Throws<BadRequestException>(() => new HttpRequest(requestString));
    }
}
