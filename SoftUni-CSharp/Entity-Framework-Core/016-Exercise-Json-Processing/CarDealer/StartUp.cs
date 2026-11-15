using System.Globalization;
using CarDealer.Data;
using CarDealer.DTOs;
using CarDealer.Models;
using Newtonsoft.Json;

namespace CarDealer;

public class StartUp
{
    public static void Main()
    {
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

        using var context = new CarDealerContext();
        // Recreates the CarDealer database on every run so the imports start clean.
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        Console.WriteLine(ImportSuppliers(context, Dataset("suppliers.json")));
        Console.WriteLine(ImportParts(context, Dataset("parts.json")));
        Console.WriteLine(ImportCars(context, Dataset("cars.json")));
        Console.WriteLine(ImportCustomers(context, Dataset("customers.json")));
        Console.WriteLine(ImportSales(context, Dataset("sales.json")));
        Console.WriteLine(GetSalesWithAppliedDiscount(context));
    }

    public static string Dataset(string name) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Datasets", name));

    // 8. Import Suppliers
    public static string ImportSuppliers(CarDealerContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<Supplier[]>(inputJson));

    // 9. Import Parts: parts of unknown suppliers are skipped
    public static string ImportParts(CarDealerContext context, string inputJson)
    {
        var supplierIds = context.Suppliers.Select(s => s.Id).ToHashSet();

        return Import(context, JsonConvert.DeserializeObject<Part[]>(inputJson).Where(p => supplierIds.Contains(p.SupplierId)).ToArray());
    }

    // 10. Import Cars: each part once, unknown parts skipped
    public static string ImportCars(CarDealerContext context, string inputJson)
    {
        var partIds = context.Parts.Select(p => p.Id).ToHashSet();
        var cars = JsonConvert.DeserializeObject<ImportCarDto[]>(inputJson)
            .Select(dto => new Car
            {
                Make = dto.Make,
                Model = dto.Model,
                TravelledDistance = dto.TravelledDistance,
                PartsCars = dto.PartsId.Distinct().Where(partIds.Contains).Select(id => new PartCar { PartId = id }).ToList()
            })
            .ToArray();

        return Import(context, cars);
    }

    // 11. Import Customers
    public static string ImportCustomers(CarDealerContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<Customer[]>(inputJson));

    // 12. Import Sales
    public static string ImportSales(CarDealerContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<Sale[]>(inputJson));

    // 13. Export Ordered Customers: experienced drivers first on equal birth dates
    public static string GetOrderedCustomers(CarDealerContext context) =>
        Serialize(context.Customers
            .OrderBy(c => c.BirthDate)
            .ThenBy(c => c.IsYoungDriver)
            .Select(c => new { c.Name, c.BirthDate, c.IsYoungDriver })
            .AsEnumerable()
            .Select(c => new { c.Name, BirthDate = c.BirthDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture), c.IsYoungDriver })
            .ToList());

    // Export Cars from Make Toyota
    public static string GetCarsFromMakeToyota(CarDealerContext context) =>
        Serialize(context.Cars
            .Where(c => c.Make == "Toyota")
            .OrderBy(c => c.Model)
            .ThenByDescending(c => c.TravelledDistance)
            .Select(c => new { c.Id, c.Make, c.Model, c.TravelledDistance })
            .ToList());

    // 14. Export Local Suppliers
    public static string GetLocalSuppliers(CarDealerContext context) =>
        Serialize(context.Suppliers
            .Where(s => !s.IsImporter)
            .OrderBy(s => s.Id)
            .Select(s => new { s.Id, s.Name, PartsCount = s.Parts.Count })
            .ToList());

    // 15. Export Cars with Their List of Parts
    public static string GetCarsWithTheirListOfParts(CarDealerContext context) =>
        Serialize(context.Cars
            .OrderBy(c => c.Id)
            .Select(c => new
            {
                car = new { c.Make, c.Model, c.TravelledDistance },
                parts = c.PartsCars.OrderBy(pc => pc.PartId).Select(pc => new { pc.Part.Name, pc.Part.Price }).ToList()
            })
            .AsEnumerable()
            .Select(c => new { c.car, parts = c.parts.Select(p => new { p.Name, Price = p.Price.ToString("f2") }) })
            .ToList());

    // 16. Export Total Sales by Customer
    public static string GetTotalSalesByCustomer(CarDealerContext context) =>
        Serialize(context.Customers
            .Where(c => c.Sales.Any())
            .Select(c => new
            {
                fullName = c.Name,
                boughtCars = c.Sales.Count,
                spentMoney = c.Sales.Sum(s => s.Car.PartsCars.Sum(pc => pc.Part.Price))
            })
            .OrderByDescending(c => c.spentMoney)
            .ThenByDescending(c => c.boughtCars)
            .ToList());

    // 17. Export Sales with Applied Discount
    public static string GetSalesWithAppliedDiscount(CarDealerContext context) =>
        Serialize(context.Sales
            .OrderBy(s => s.Id)
            .Take(10)
            .Select(s => new
            {
                car = new { s.Car.Make, s.Car.Model, s.Car.TravelledDistance },
                customerName = s.Customer.Name,
                s.Discount,
                Price = s.Car.PartsCars.Sum(pc => pc.Part.Price)
            })
            .AsEnumerable()
            .Select(s => new
            {
                s.car,
                s.customerName,
                Discount = s.Discount.ToString("f2"),
                price = s.Price.ToString("f2"),
                priceWithDiscount = (s.Price * (1 - s.Discount / 100)).ToString("f2")
            })
            .ToList());

    private static string Import<T>(CarDealerContext context, T[] entities)
        where T : class
    {
        context.AddRange(entities);
        context.SaveChanges();

        return $"Successfully imported {entities.Length}.";
    }

    private static string Serialize(object value) => JsonConvert.SerializeObject(value, Formatting.Indented);
}
