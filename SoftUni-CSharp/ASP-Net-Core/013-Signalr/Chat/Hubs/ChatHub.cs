using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs;

// RPC both ways: clients call these methods, the server calls "Receive"/"System" on clients.
public class ChatHub : Hub
{
    public const int MaxMessageLength = 500;

    public async Task Send(string user, string message)
    {
        Validate(user, message);
        await Clients.All.SendAsync("Receive", user, message);
    }

    public async Task JoinRoom(string room)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, room);
        await Clients.OthersInGroup(room).SendAsync("System", $"Someone joined {room}");
    }

    public Task LeaveRoom(string room) => Groups.RemoveFromGroupAsync(Context.ConnectionId, room);

    public async Task SendToRoom(string room, string user, string message)
    {
        Validate(user, message);
        await Clients.Group(room).SendAsync("Receive", user, message);
    }

    // Client input crosses a trust boundary: reject empty and oversized messages.
    private static void Validate(string user, string message)
    {
        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(message) || message.Length > MaxMessageLength)
        {
            throw new HubException($"User and message are required; message max {MaxMessageLength} chars.");
        }
    }
}
