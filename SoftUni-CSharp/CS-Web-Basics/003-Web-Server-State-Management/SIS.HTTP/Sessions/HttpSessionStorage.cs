using System.Collections.Concurrent;

namespace SIS.HTTP.Sessions;

// shortcut: sessions live in memory forever and vanish on restart; add expiry or a store when it matters.
public static class HttpSessionStorage
{
    public const string SessionCookieKey = "SIS_ID";

    private static readonly ConcurrentDictionary<string, IHttpSession> Sessions = new();

    public static bool ContainsSession(string id) => Sessions.ContainsKey(id);

    public static IHttpSession GetSession(string id) => Sessions.GetOrAdd(id, _ => new HttpSession(id));
}
