namespace SIS.HTTP.Cookies;

public class HttpCookie
{
    private const int DefaultExpirationDays = 3;
    private const string DefaultPath = "/";

    // Created by the server, e.g. on login.
    public HttpCookie(string key, string value, int expires = DefaultExpirationDays, string path = DefaultPath)
    {
        Key = key;
        Value = value;
        Expires = DateTime.UtcNow.AddDays(expires);
        Path = path;
        IsNew = true;
    }

    // isNew: false for cookies the client sent back.
    public HttpCookie(
        string key,
        string value,
        bool isNew,
        int expires = DefaultExpirationDays,
        string path = DefaultPath
    )
        : this(key, value, expires, path)
    {
        IsNew = isNew;
    }

    public string Key { get; }

    public string Value { get; }

    public DateTime Expires { get; private set; }

    public string Path { get; set; }

    public bool IsNew { get; }

    public bool HttpOnly { get; set; } = true;

    // An expiry in the past tells the browser to drop the cookie.
    public void Delete() => Expires = DateTime.UtcNow.AddDays(-1);

    public override string ToString() =>
        $"{Key}={Value}; Expires={Expires:R}; Path={Path}" + (HttpOnly ? "; HttpOnly" : "");
}
