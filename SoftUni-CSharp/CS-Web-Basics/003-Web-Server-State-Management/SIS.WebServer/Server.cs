using System.Net;
using System.Net.Sockets;
using SIS.WebServer.Routing;

namespace SIS.WebServer;

public class Server
{
    private const string LocalhostIpAddress = "127.0.0.1";

    private readonly int port;
    private readonly TcpListener listener;
    private readonly ServerRoutingTable routingTable;
    private bool isRunning;

    public Server(int port, ServerRoutingTable routingTable)
    {
        this.port = port;
        this.routingTable = routingTable;
        listener = new TcpListener(IPAddress.Parse(LocalhostIpAddress), port);
    }

    // Accepts clients until Stop(); each client is handled on its own task, so one slow client never blocks the rest.
    public async Task RunAsync()
    {
        listener.Start();
        isRunning = true;
        Console.WriteLine($"Server started at http://{LocalhostIpAddress}:{port}");

        while (isRunning)
        {
            Socket client;
            try
            {
                client = await listener.AcceptSocketAsync();
            }
            catch (Exception e) when (!isRunning && e is SocketException or ObjectDisposedException)
            {
                break;
            }

            _ = Task.Run(() => Listen(client));
        }
    }

    public void Stop()
    {
        isRunning = false;
        listener.Stop();
    }

    private async Task Listen(Socket client) => await new ConnectionHandler(client, routingTable).ProcessRequestAsync();
}
