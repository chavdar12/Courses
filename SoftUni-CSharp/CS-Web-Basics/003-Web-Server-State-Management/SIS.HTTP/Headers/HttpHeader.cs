namespace SIS.HTTP.Headers;

public class HttpHeader
{
    public const string Host = "Host";
    public const string ContentType = "Content-Type";
    public const string Location = "Location";
    public const string Cookie = "Cookie";
    public const string SetCookie = "Set-Cookie";

    public HttpHeader(string key, string value)
    {
        Key = key;
        Value = value;
    }

    public string Key { get; }

    public string Value { get; }

    public override string ToString() => $"{Key}: {Value}";
}
