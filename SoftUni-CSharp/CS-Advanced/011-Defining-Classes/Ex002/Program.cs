namespace Ex002;

internal class Program
{
    private static void Main(string[] args)
    {
        var car = new Car
        {
            Make = "VW",
            Model = "MK3",
            Year = 1992,
        };
        Console.WriteLine($"Make: {car.Make}\nModel: {car.Model}\nYear: {car.Year}");
    }
}
