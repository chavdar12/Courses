using P01_StudentSystem.Data;

namespace P01_StudentSystem;

public class StartUp
{
    public static void Main()
    {
        using var context = new StudentSystemContext();
        context.Database.EnsureCreated();
        Console.WriteLine("StudentSystem database is ready.");
    }
}
