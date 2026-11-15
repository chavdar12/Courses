using CarDealer.Data;
using CarDealer.DTOs.Export;
using CarDealer.DTOs.Import;
using CarDealer.Models;

namespace CarDealer;

public class StartUp
{
    public static void Main()
    {
        using var context = new CarDealerContext();
        // Recreates the CarDealer database on every run so the imports start clean.
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        Console.WriteLine(ImportSuppliers(context, Dataset("suppliers.xml")));
        Console.WriteLine(ImportParts(context, Dataset("parts.xml")));
        Console.WriteLine(ImportCars(context, Dataset("cars.xml")));
        Console.WriteLine(ImportCustomers(context, Dataset("customers.xml")));
        Console.WriteLine(ImportSales(context, Dataset("sales.xml")));
        Console.WriteLine(GetSalesWithAppliedDiscount(context));
    }

    public static string Dataset(string name) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Datasets", name));

    // Import Suppliers
    public static string ImportSuppliers(CarDealerContext context, string inputXml) =>
        Import(context, XmlHelper.Deserialize<ImportSupplierDto[]>(inputXml, "Suppliers")
            .Select(s => new Supplier { Name = s.Name, IsImporter = s.IsImporter })
            .ToArray());

    // Import Parts: parts of unknown suppliers are skipped
    public static string ImportParts(CarDealerContext context, string inputXml)
    {
        var supplierIds = context.Suppliers.Select(s => s.Id).ToHashSet();

        return Import(context, XmlHelper.Deserialize<ImportPartDto[]>(inputXml, "Parts")
            .Where(p => supplierIds.Contains(p.SupplierId))
            .Select(p => new Part { Name = p.Name, Price = p.Price, Quantity = p.Quantity, SupplierId = p.SupplierId })
            .ToArray());
    }

    // Import Cars: unique part ids, unknown parts skipped
    public static string ImportCars(CarDealerContext context, string inputXml)
    {
        var partIds = context.Parts.Select(p => p.Id).ToHashSet();

        return Import(context, XmlHelper.Deserialize<ImportCarDto[]>(inputXml, "Cars")
            .Select(c => new Car
            {
                Make = c.Make,
                Model = c.Model,
                TravelledDistance = c.TraveledDistance,
                PartsCars = c.Parts.Select(p => p.Id).Distinct().Where(partIds.Contains).Select(id => new PartCar { PartId = id }).ToList()
            })
            .ToArray());
    }

    // Import Customers
    public static string ImportCustomers(CarDealerContext context, string inputXml) =>
        Import(context, XmlHelper.Deserialize<ImportCustomerDto[]>(inputXml, "Customers")
            .Select(c => new Customer { Name = c.Name, BirthDate = c.BirthDate, IsYoungDriver = c.IsYoungDriver })
            .ToArray());

    // Import Sales: sales of unknown cars are skipped
    public static string ImportSales(CarDealerContext context, string inputXml)
    {
        var carIds = context.Cars.Select(c => c.Id).ToHashSet();

        return Import(context, XmlHelper.Deserialize<ImportSaleDto[]>(inputXml, "Sales")
            .Where(s => carIds.Contains(s.CarId))
            .Select(s => new Sale { CarId = s.CarId, CustomerId = s.CustomerId, Discount = s.Discount })
            .ToArray());
    }

    // Cars With Distance
    public static string GetCarsWithDistance(CarDealerContext context) =>
        XmlHelper.Serialize(context.Cars
            .Where(c => c.TravelledDistance > 2_000_000)
            .OrderBy(c => c.Make)
            .ThenBy(c => c.Model)
            .Take(10)
            .Select(c => new ExportCarWithDistanceDto { Make = c.Make, Model = c.Model, TravelledDistance = c.TravelledDistance })
            .ToArray(), "cars");

    // Cars from make BMW
    public static string GetCarsFromMakeBmw(CarDealerContext context) =>
        XmlHelper.Serialize(context.Cars
            .Where(c => c.Make == "BMW")
            .OrderBy(c => c.Model)
            .ThenByDescending(c => c.TravelledDistance)
            .Select(c => new ExportBmwCarDto { Id = c.Id, Model = c.Model, TravelledDistance = c.TravelledDistance })
            .ToArray(), "cars");

    // Local Suppliers
    public static string GetLocalSuppliers(CarDealerContext context) =>
        XmlHelper.Serialize(context.Suppliers
            .Where(s => !s.IsImporter)
            .OrderBy(s => s.Id)
            .Select(s => new ExportLocalSupplierDto { Id = s.Id, Name = s.Name, PartsCount = s.Parts.Count })
            .ToArray(), "suppliers");

    // Cars with Their List of Parts
    public static string GetCarsWithTheirListOfParts(CarDealerContext context) =>
        XmlHelper.Serialize(context.Cars
            .OrderByDescending(c => c.TravelledDistance)
            .ThenBy(c => c.Model)
            .Take(5)
            .Select(c => new ExportCarWithPartsDto
            {
                Make = c.Make,
                Model = c.Model,
                TravelledDistance = c.TravelledDistance,
                Parts = c.PartsCars
                    .OrderByDescending(pc => pc.Part.Price)
                    .Select(pc => new ExportPartDto { Name = pc.Part.Name, Price = pc.Part.Price })
                    .ToArray()
            })
            .ToArray(), "cars");

    // Total Sales by Customer
    public static string GetTotalSalesByCustomer(CarDealerContext context) =>
        XmlHelper.Serialize(context.Customers
            .Where(c => c.Sales.Any())
            .Select(c => new ExportCustomerSalesDto
            {
                FullName = c.Name,
                BoughtCars = c.Sales.Count,
                SpentMoney = c.Sales.Sum(s => s.Car.PartsCars.Sum(pc => pc.Part.Price))
            })
            .OrderByDescending(c => c.SpentMoney)
            .ToArray(), "customers");

    // Sales with Applied Discount
    public static string GetSalesWithAppliedDiscount(CarDealerContext context) =>
        XmlHelper.Serialize(context.Sales
            .OrderBy(s => s.Id)
            .Select(s => new
            {
                Car = new ExportCarAttributesDto { Make = s.Car.Make, Model = s.Car.Model, TravelledDistance = s.Car.TravelledDistance },
                s.Discount,
                CustomerName = s.Customer.Name,
                Price = s.Car.PartsCars.Sum(pc => pc.Part.Price)
            })
            .AsEnumerable()
            .Select(s => new ExportSaleDto
            {
                Car = s.Car,
                Discount = s.Discount,
                CustomerName = s.CustomerName,
                Price = s.Price,
                PriceWithDiscount = Math.Round(s.Price * (1 - s.Discount / 100), 2)
            })
            .ToArray(), "sales");

    private static string Import<T>(CarDealerContext context, T[] entities)
        where T : class
    {
        context.AddRange(entities);
        context.SaveChanges();

        return $"Successfully imported {entities.Length}";
    }
}
