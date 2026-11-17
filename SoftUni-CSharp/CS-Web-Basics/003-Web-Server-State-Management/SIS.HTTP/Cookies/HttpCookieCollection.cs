using System.Collections;

namespace SIS.HTTP.Cookies;

public class HttpCookieCollection : IHttpCookieCollection
{
    private readonly Dictionary<string, HttpCookie> cookies = new();

    public void AddCookie(HttpCookie cookie) => cookies[cookie.Key] = cookie;

    public bool ContainsCookie(string key) => cookies.ContainsKey(key);

    public HttpCookie GetCookie(string key) => cookies.GetValueOrDefault(key);

    public bool HasCookies() => cookies.Count > 0;

    public IEnumerator<HttpCookie> GetEnumerator() => cookies.Values.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

    public override string ToString() => string.Join("; ", cookies.Values);
}
