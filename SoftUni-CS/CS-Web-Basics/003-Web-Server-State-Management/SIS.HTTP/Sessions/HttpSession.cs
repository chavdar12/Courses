using System.Collections.Concurrent;

namespace SIS.HTTP.Sessions;

public class HttpSession : IHttpSession
{
    // One client can send parallel requests with the same session.
    private readonly ConcurrentDictionary<string, object> parameters = new();

    public HttpSession(string id)
    {
        Id = id;
    }

    public string Id { get; }

    public object GetParameter(string name) => parameters.GetValueOrDefault(name);

    public bool ContainsParameter(string name) => parameters.ContainsKey(name);

    public void AddParameter(string name, object parameter) => parameters[name] = parameter;

    public void ClearParameters() => parameters.Clear();
}
