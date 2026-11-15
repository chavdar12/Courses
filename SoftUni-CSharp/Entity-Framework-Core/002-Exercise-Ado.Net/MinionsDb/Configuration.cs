namespace MinionsDb;

public static class Configuration
{
    // Points at the local SQL Server; Initial Catalog is master so task 1 can create MinionsDB.
    public const string ServerConnectionString =
        "Server=localhost,1433;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True";

    public const string ConnectionString = ServerConnectionString + ";Database=MinionsDB";
}
