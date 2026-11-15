using System.Net;
using SIS.HTTP.Cookies;
using SIS.HTTP.Requests;
using SIS.HTTP.Responses;

namespace StateManagementTests;

public class CookieTests
{
    [Test]
    public void ServerCookieIsNewHttpOnlyAndFormattedForTheWeb()
    {
        var cookie = new HttpCookie("lang", "en", 1);

        Assert.That(cookie.IsNew, Is.True);
        Assert.That(cookie.Expires, Is.EqualTo(DateTime.UtcNow.AddDays(1)).Within(TimeSpan.FromMinutes(1)));
        Assert.That(cookie.ToString(), Is.EqualTo($"lang=en; Expires={cookie.Expires:R}; Path=/; HttpOnly"));
    }

    [Test]
    public void DeleteMovesExpiryIntoThePast()
    {
        var cookie = new HttpCookie("lang", "en");

        cookie.Delete();

        Assert.That(cookie.Expires, Is.LessThan(DateTime.UtcNow));
    }

    [Test]
    public void CollectionAddsFindsAndJoinsCookies()
    {
        var cookies = new HttpCookieCollection();
        Assert.That(cookies.HasCookies(), Is.False);

        cookies.AddCookie(new HttpCookie("a", "1") { HttpOnly = false });
        cookies.AddCookie(new HttpCookie("b", "2") { HttpOnly = false });

        Assert.That(cookies.HasCookies(), Is.True);
        Assert.That(cookies.ContainsCookie("a"), Is.True);
        Assert.That(cookies.GetCookie("b").Value, Is.EqualTo("2"));
        Assert.That(cookies.GetCookie("missing"), Is.Null);
        Assert.That(cookies.ToString(), Does.Match("^a=1; Expires=.*; Path=/; b=2; Expires=.*; Path=/$"));
    }

    [Test]
    public void RequestParsesCookieHeaderAsClientCookies()
    {
        var request = new HttpRequest("GET / HTTP/1.1\r\nHost: localhost\r\nCookie: lang=en; SIS_ID=abc=def\r\n\r\n");

        Assert.That(request.Cookies.GetCookie("lang").Value, Is.EqualTo("en"));
        Assert.That(request.Cookies.GetCookie("SIS_ID").Value, Is.EqualTo("abc=def"));
        Assert.That(request.Cookies.GetCookie("lang").IsNew, Is.False);
    }

    [Test]
    public void ResponseSendsOneSetCookieHeaderPerCookie()
    {
        var response = new HttpResponse(HttpStatusCode.OK);
        response.AddCookie(new HttpCookie("a", "1"));
        response.AddCookie(new HttpCookie("b", "2"));

        var lines = response.ToString().Split("\r\n");

        Assert.That(lines.Count(line => line.StartsWith("Set-Cookie: ")), Is.EqualTo(2));
        Assert.That(lines, Has.One.StartsWith("Set-Cookie: a=1; "));
    }
}
