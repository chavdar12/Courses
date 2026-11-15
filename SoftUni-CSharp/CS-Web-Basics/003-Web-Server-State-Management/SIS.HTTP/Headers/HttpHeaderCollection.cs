namespace SIS.HTTP.Headers;

public class HttpHeaderCollection : IHttpHeaderCollection
{
    // Header names are case-insensitive in HTTP.
    private readonly Dictionary<string, HttpHeader> headers = new(StringComparer.OrdinalIgnoreCase);

    public void AddHeader(HttpHeader header) => headers[header.Key] = header;

    public bool ContainsHeader(string key) => headers.ContainsKey(key);

    public HttpHeader GetHeader(string key) => headers.GetValueOrDefault(key);

    public override string ToString() => string.Join(HttpProtocol.NewLine, headers.Values);
}
