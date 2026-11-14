using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class DefiningClassesTests
{
    private const string Module = "011-Defining-Classes.";

    [Fact]
    public void Ex001_SpecialCars() => AssertOutput(Module + "Ex001", """
        2 2.6 3 1.6 2 3.6 3 1.6
        1 3.3 2 1.6 5 2.4 1 3.2
        No more tires
        331 2.2
        145 2.0
        Engines done
        Audi A5 2017 200 12 0 0
        BMW X5 2007 175 18 1 1
        Show special
        """, """
        Make: Audi
        Model: A5
        Year: 2017
        HorsePowers: 331
        FuelQuantity: 197.6
        """);

    [Fact]
    public void Ex002_Car() => AssertOutput(Module + "Ex002", "", """
        Make: VW
        Model: MK3
        Year: 1992
        """);

    [Fact]
    public void Ex003_CarExtensionRefusesTripsWithoutFuel() => AssertOutput(Module + "Ex003", "", """
        Not enough fuel to perform this trip!
        Make: VW
        Model: MK3
        Year: 1992
        Fuel: 150.00
        """);

    [Fact]
    public void Ex004_CarConstructorsFillDefaults() => AssertOutput(Module + "Ex004", "", """
        Make: VW
        Model: Golf
        Year: 2025
        Fuel: 200.00

        Make: Audi
        Model: A4
        Year: 2019
        Fuel: 200.00

        Make: Tesla
        Model: Model 3
        Year: 2023
        Fuel: 75.00
        """);

    [Fact]
    public void Ex005_CarEngineAndTires() => AssertOutput(Module + "Ex005", "", """
        Make: Lamborghini
        Model: Urus
        Year: 2010
        Fuel: 250.00
        Engine: 560 hp, 6300 cc
        Tire pressure: 2.5, 2.1, 0.5, 2.3
        """);
}
