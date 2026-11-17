namespace MiniORM;

// Lets a DatabaseConnection be opened and closed with a using block.
internal class ConnectionManager : IDisposable
{
    private readonly DatabaseConnection connection;

    public ConnectionManager(DatabaseConnection connection)
    {
        this.connection = connection;
        this.connection.Open();
    }

    public void Dispose() => connection.Close();
}
