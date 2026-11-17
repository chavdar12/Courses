namespace Ex003;

internal class Program
{
    private static void Main(string[] args)
    {
        var car = new Car
        {
            Make = "VW",
            Model = "MK3",
            Year = 1992,
            FuelQuantity = 200,
            FuelConsumption = 0.5,
        };
        car.Drive(100);
        car.Drive(1000);
        Console.WriteLine(car.WhoAmI());
    }
}
