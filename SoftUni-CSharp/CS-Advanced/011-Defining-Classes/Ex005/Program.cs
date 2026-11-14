namespace Ex005;

internal class Program
{
    private static void Main(string[] args)
    {
        var tires = new[] { new Tire(1, 2.5), new Tire(1, 2.1), new Tire(2, 0.5), new Tire(2, 2.3) };
        var engine = new Engine(560, 6300);
        var car = new Car("Lamborghini", "Urus", 2010, 250, 9, engine, tires);

        Console.WriteLine(car.WhoAmI());
        Console.WriteLine($"Engine: {car.Engine.HorsePower} hp, {car.Engine.CubicCapacity} cc");
        Console.WriteLine($"Tire pressure: {string.Join(", ", car.Tires.Select(t => t.Pressure))}");
    }
}
