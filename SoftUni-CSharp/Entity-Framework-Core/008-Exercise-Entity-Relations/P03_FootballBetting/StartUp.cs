using P03_FootballBetting.Data;

namespace P03_FootballBetting;

public class StartUp
{
    public static void Main()
    {
        using var context = new FootballBettingContext();
        context.Database.EnsureCreated();
        Console.WriteLine("FootballBetting database is ready.");
    }
}
