using System.Net;
using System.Net.Sockets;
using System.Text;
using SIS.HTTP.Cookies;
using SIS.HTTP.Exceptions;
using SIS.HTTP.Requests;
using SIS.HTTP.Responses;
using SIS.HTTP.Sessions;
using SIS.WebServer.Results;
using SIS.WebServer.Routing;

namespace SIS.WebServer;

public class ConnectionHandler
{
    private const int BufferSize = 1024;

    private readonly Socket client;
    private readonly ServerRoutingTable routingTable;

    public ConnectionHandler(Socket client, ServerRoutingTable routingTable)
    {
        this.client = client;
        this.routingTable = routingTable;
    }

    public async Task ProcessRequestAsync()
    {
        try
        {
            var request = await ReadRequest();
            if (request != null)
            {
                var sessionId = SetRequestSession(request);
                var response = HandleRequest(request);
                SetResponseSession(response, sessionId);
                await PrepareResponse(response);
            }
        }
        catch (BadRequestException e)
        {
            await PrepareResponse(new TextResult(e.Message, HttpStatusCode.BadRequest));
        }
        catch (Exception)
        {
            // Never send the exception details to the client.
            await PrepareResponse(new TextResult("Internal Server Error", HttpStatusCode.InternalServerError));
        }
        finally
        {
            client.Shutdown(SocketShutdown.Both);
            client.Dispose();
        }
    }

    // shortcut: stops at the first read shorter than the buffer, so a request split across TCP packets is cut short; read Content-Length to fix.
    private async Task<IHttpRequest> ReadRequest()
    {
        var buffer = new byte[BufferSize];
        using var data = new MemoryStream();

        while (true)
        {
            var read = await client.ReceiveAsync(buffer, SocketFlags.None);
            data.Write(buffer, 0, read);
            if (read < BufferSize) break;
        }

        // Decode once at the end, so multi-byte characters split between reads stay intact.
        return data.Length == 0 ? null : new HttpRequest(Encoding.UTF8.GetString(data.ToArray()));
    }

    private IHttpResponse HandleRequest(IHttpRequest request)
    {
        if (!routingTable.Contains(request.RequestMethod, request.Path))
        {
            return new TextResult($"Route with method {request.RequestMethod} and path \"{request.Path}\" not found.", HttpStatusCode.NotFound);
        }

        return routingTable.Get(request.RequestMethod, request.Path).Invoke(request);
    }

    // Reuse the session from the SIS_ID cookie, or start a new one. Ids the server never issued are replaced, so a client can't pick its own (session fixation).
    private static string SetRequestSession(IHttpRequest request)
    {
        var sessionId = request.Cookies.GetCookie(HttpSessionStorage.SessionCookieKey)?.Value;
        if (sessionId == null || !HttpSessionStorage.ContainsSession(sessionId)) sessionId = Guid.NewGuid().ToString();

        request.Session = HttpSessionStorage.GetSession(sessionId);
        return sessionId;
    }

    private static void SetResponseSession(IHttpResponse response, string sessionId) =>
        response.AddCookie(new HttpCookie(HttpSessionStorage.SessionCookieKey, sessionId));

    private async Task PrepareResponse(IHttpResponse response) => await client.SendAsync(response.GetBytes(), SocketFlags.None);
}
