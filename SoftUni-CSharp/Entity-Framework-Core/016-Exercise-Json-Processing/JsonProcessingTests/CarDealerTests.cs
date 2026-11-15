using CarDealer;
using CarDealer.Data;
using Microsoft.EntityFrameworkCore;

namespace JsonProcessingTests;

public class CarDealerTests
{
    private CarDealerContext context;

    [SetUp]
    public void SetUp()
    {
        context = new CarDealerContext(
            new DbContextOptionsBuilder<CarDealerContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options
        );
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void ImportsSkipUnknownSuppliersAndParts()
    {
        Assert.That(
            StartUp.ImportSuppliers(context, StartUp.Dataset("suppliers.json")),
            Is.EqualTo("Successfully imported 3.")
        );
        Assert.That(
            StartUp.ImportParts(context, StartUp.Dataset("parts.json")),
            Is.EqualTo("Successfully imported 4.")
        );
        Assert.That(StartUp.ImportCars(context, StartUp.Dataset("cars.json")), Is.EqualTo("Successfully imported 5."));
        Assert.That(
            StartUp.ImportCustomers(context, StartUp.Dataset("customers.json")),
            Is.EqualTo("Successfully imported 3.")
        );
        Assert.That(
            StartUp.ImportSales(context, StartUp.Dataset("sales.json")),
            Is.EqualTo("Successfully imported 3.")
        );
        Assert.That(
            context.Cars.Where(c => c.Id == 2).SelectMany(c => c.PartsCars).Select(pc => pc.PartId),
            Is.EquivalentTo(new[] { 2, 3, 4 })
        );
    }

    [Test]
    public void OrderedCustomersPutExperiencedDriversFirst()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "Name": "Donnetta Soliz", "BirthDate": "01/10/1960", "IsYoungDriver": false },
              { "Name": "Louann Holzworth", "BirthDate": "01/10/1960", "IsYoungDriver": true },
              { "Name": "Ann Mcenaney", "BirthDate": "20/11/1993", "IsYoungDriver": true }
            ]
            """,
            StartUp.GetOrderedCustomers(context)
        );
    }

    [Test]
    public void CarsFromMakeToyota()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "Id": 5, "Make": "Toyota", "Model": "Auris", "TravelledDistance": 1000 },
              { "Id": 4, "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 486872832 },
              { "Id": 3, "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 397831570 }
            ]
            """,
            StartUp.GetCarsFromMakeToyota(context)
        );
    }

    [Test]
    public void LocalSuppliers()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "Id": 2, "Name": "Agway Inc.", "PartsCount": 2 },
              { "Id": 3, "Name": "Airgas, Inc.", "PartsCount": 1 }
            ]
            """,
            StartUp.GetLocalSuppliers(context)
        );
    }

    [Test]
    public void CarsWithTheirListOfParts()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "car": { "Make": "Opel", "Model": "Omega", "TravelledDistance": 176664996 }, "parts": [] },
              { "car": { "Make": "Opel", "Model": "Corsa", "TravelledDistance": 347259126 }, "parts": [
                { "Name": "Pillar", "Price": "100.99" }, { "Name": "Valance", "Price": "1002.99" }, { "Name": "Front clip", "Price": "100.00" } ] },
              { "car": { "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 397831570 }, "parts": [
                { "Name": "Bonnet/hood", "Price": "1001.34" } ] },
              { "car": { "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 486872832 }, "parts": [
                { "Name": "Bonnet/hood", "Price": "1001.34" }, { "Name": "Pillar", "Price": "100.99" } ] },
              { "car": { "Make": "Toyota", "Model": "Auris", "TravelledDistance": 1000 }, "parts": [] }
            ]
            """,
            StartUp.GetCarsWithTheirListOfParts(context)
        );
    }

    [Test]
    public void TotalSalesByCustomer()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "fullName": "Donnetta Soliz", "boughtCars": 2, "spentMoney": 2103.67 },
              { "fullName": "Ann Mcenaney", "boughtCars": 1, "spentMoney": 1203.98 }
            ]
            """,
            StartUp.GetTotalSalesByCustomer(context)
        );
    }

    [Test]
    public void SalesWithAppliedDiscount()
    {
        ImportAll();

        JsonAssert.AreEqual(
            """
            [
              { "car": { "Make": "Opel", "Model": "Corsa", "TravelledDistance": 347259126 },
                "customerName": "Ann Mcenaney", "Discount": "30.00", "price": "1203.98", "priceWithDiscount": "842.79" },
              { "car": { "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 486872832 },
                "customerName": "Donnetta Soliz", "Discount": "10.00", "price": "1102.33", "priceWithDiscount": "992.10" },
              { "car": { "Make": "Toyota", "Model": "Camry Hybrid", "TravelledDistance": 397831570 },
                "customerName": "Donnetta Soliz", "Discount": "0.00", "price": "1001.34", "priceWithDiscount": "1001.34" }
            ]
            """,
            StartUp.GetSalesWithAppliedDiscount(context)
        );
    }

    private void ImportAll()
    {
        StartUp.ImportSuppliers(context, StartUp.Dataset("suppliers.json"));
        StartUp.ImportParts(context, StartUp.Dataset("parts.json"));
        StartUp.ImportCars(context, StartUp.Dataset("cars.json"));
        StartUp.ImportCustomers(context, StartUp.Dataset("customers.json"));
        StartUp.ImportSales(context, StartUp.Dataset("sales.json"));
        context.ChangeTracker.Clear();
    }
}
