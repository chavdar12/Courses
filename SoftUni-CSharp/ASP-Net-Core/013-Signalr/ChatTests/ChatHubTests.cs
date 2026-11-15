using System.Threading.Channels;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;

namespace ChatTests;

public class ChatHubTests
{
    private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(5);

    private WebApplicationFactory<Program> factory;
    private readonly List<HubConnection> connections = [];

    [SetUp]
    public void SetUp() => factory = new WebApplicationFactory<Program>();

    [TearDown]
    public async Task TearDown()
    {
        foreach (var connection in connections)
        {
            await connection.DisposeAsync();
        }

        connections.Clear();
        factory.Dispose();
    }

    [Test]
    public async Task MessageReachesEveryClient()
    {
        var (alice, aliceInbox) = await Connect();
        var (_, bobInbox) = await Connect();

        await alice.InvokeAsync("Send", "alice", "hi all");

        Assert.That(await Next(aliceInbox), Is.EqualTo("alice: hi all"));
        Assert.That(await Next(bobInbox), Is.EqualTo("alice: hi all"));
    }

    [Test]
    public async Task RoomMessagesStayInTheRoom()
    {
        var (alice, aliceInbox) = await Connect();
        var (bob, bobInbox) = await Connect();
        var (_, carolInbox) = await Connect();

        await alice.InvokeAsync("JoinRoom", "dev");
        await bob.InvokeAsync("JoinRoom", "dev");
        Assert.That(await Next(aliceInbox), Is.EqualTo("Someone joined dev"));

        await bob.InvokeAsync("SendToRoom", "dev", "bob", "standup?");

        Assert.That(await Next(aliceInbox), Is.EqualTo("bob: standup?"));
        Assert.That(await Next(bobInbox), Is.EqualTo("bob: standup?"));
        Assert.That(carolInbox.TryRead(out _), Is.False);
    }

    [TestCase("", "hi")]
    [TestCase("alice", " ")]
    public async Task InvalidMessagesAreRejected(string user, string message)
    {
        var (alice, _) = await Connect();

        var error = Assert.ThrowsAsync<HubException>(() => alice.InvokeAsync("Send", user, message));
        Assert.That(error!.Message, Does.Contain("required"));
    }

    [Test]
    public async Task OversizedMessageIsRejected()
    {
        var (alice, _) = await Connect();

        Assert.ThrowsAsync<HubException>(() => alice.InvokeAsync("Send", "alice", new string('x', 501)));
    }

    // Long polling over TestServer's in-memory handler: no real sockets needed.
    private async Task<(HubConnection, ChannelReader<string>)> Connect()
    {
        var inbox = Channel.CreateUnbounded<string>();
        var connection = new HubConnectionBuilder()
            .WithUrl(
                new Uri(factory.Server.BaseAddress, "chat"),
                o =>
                {
                    o.Transports = HttpTransportType.LongPolling;
                    o.HttpMessageHandlerFactory = _ => factory.Server.CreateHandler();
                }
            )
            .Build();
        connection.On<string, string>("Receive", (user, message) => inbox.Writer.TryWrite($"{user}: {message}"));
        connection.On<string>("System", text => inbox.Writer.TryWrite(text));

        await connection.StartAsync();
        connections.Add(connection);
        return (connection, inbox.Reader);
    }

    private static async Task<string> Next(ChannelReader<string> inbox) =>
        await inbox.ReadAsync().AsTask().WaitAsync(Timeout);
}
