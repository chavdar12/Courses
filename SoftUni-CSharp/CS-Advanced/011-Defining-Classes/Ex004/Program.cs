namespace Ex004;

internal class Program
{
    private static void Main(string[] args)
    {
        var cars = new[]
        {
            new Car(),
            new Car("Audi", "A4", 2019),
            new Car("Tesla", "Model 3", 2023, 75, 0.15)
        };

        Console.WriteLine(string.Join("\n\n", cars.Select(c => c.WhoAmI())));
    }
}
