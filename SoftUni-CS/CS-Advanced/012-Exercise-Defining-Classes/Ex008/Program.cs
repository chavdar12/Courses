namespace Ex008;

internal class Program
{
    private static void Main(string[] args)
    {
        var peter = new Person();
        peter.Name = "Peter";
        peter.Age = 20;
        var george = new Person { Name = "George", Age = 18 };
        var jose = new Person { Name = "Jose", Age = 43 };

        Console.WriteLine(string.Join(Environment.NewLine, peter, george, jose));
    }
}
