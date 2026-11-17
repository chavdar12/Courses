using Microsoft.EntityFrameworkCore;
using PetStore.Data;
using PetStore.Data.Models;
using PetStore.Data.Models.Enums;
using PetStore.Services;

namespace PetStoreTests;

public class ServicesTests
{
    private static readonly DateTime January = new(2026, 1, 15);
    private static readonly DateTime February = new(2026, 2, 2);

    private PetStoreDbContext context;
    private ClientService clients;
    private ProductService products;
    private PetService pets;
    private GroomingSalon salon;
    private ReportService reports;

    [SetUp]
    public void SetUp()
    {
        context = new PetStoreDbContext(
            new DbContextOptionsBuilder<PetStoreDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options
        );
        clients = new ClientService(context);
        products = new ProductService(context, clients);
        pets = new PetService(context, clients);
        salon = new GroomingSalon(context, clients);
        reports = new ReportService(context);
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void BuyingTheSameProductAgainAddsStock()
    {
        var first = products.Buy("Acme", "Kibble", ProductType.Food, 10, 2, 5, January);
        var second = products.Buy("Acme", "Kibble", ProductType.Food, 5, 2, 6, January);

        Assert.That(second, Is.EqualTo(first));
        Assert.That(
            context.Products.Single(),
            Has.Property(nameof(Product.Quantity)).EqualTo(15).And.Property(nameof(Product.Price)).EqualTo(6)
        );
        Assert.That(context.Distributors.Count(), Is.EqualTo(1));
        Assert.That(context.Purchases.Count(), Is.EqualTo(2));
    }

    [Test]
    public void SellingTakesFromStockAndRejectsOverselling()
    {
        var kibble = products.Buy("Acme", "Kibble", ProductType.Food, 10, 2, 5, January);
        var client = clients.Register("Pesho", withClientCard: false);

        Assert.That(products.Sell(client, kibble, 4, January), Is.EqualTo(20));
        Assert.That(context.Products.Single().Quantity, Is.EqualTo(6));
        Assert.That(() => products.Sell(client, kibble, 7, January), Throws.InvalidOperationException);
        Assert.That(() => products.Sell(client, 42, 1, January), Throws.ArgumentException);
    }

    [Test]
    public void ClientCardDiscountGrowsWithSpending()
    {
        var toy = products.Buy("Toys Ltd", "Ball", ProductType.Toy, 100, 50, 100, January);
        var client = clients.Register("Gosho", withClientCard: true);

        Assert.That(clients.GetDiscountPercent(client), Is.EqualTo(2));
        Assert.That(products.Sell(client, toy, 6, January), Is.EqualTo(588));
        Assert.That(clients.GetDiscountPercent(client), Is.EqualTo(5));
        Assert.That(products.Sell(client, toy, 5, January), Is.EqualTo(475));
        Assert.That(clients.GetDiscountPercent(client), Is.EqualTo(10));
        Assert.That(clients.GetDiscountPercent(clients.Register("No card", withClientCard: false)), Is.EqualTo(0));
    }

    [Test]
    public void FullGroomingSetIsDiscounted()
    {
        var client = clients.Register("Maria", withClientCard: false);

        Assert.That(GroomingSalon.Quote(GroomingService.Bathing | GroomingService.Clipping), Is.EqualTo(55));
        Assert.That(salon.Groom(client, GroomingService.FullSet, January), Is.EqualTo(64));
        Assert.That(() => salon.Groom(client, GroomingService.None, January), Throws.ArgumentException);
    }

    [Test]
    public void APetCanOnlyBeSoldOnce()
    {
        var rex = pets.Add("Rex", "Labrador", Gender.Male, new DateTime(2025, 5, 1), 300);
        var client = clients.Register("Ivan", withClientCard: false);

        Assert.That(pets.Sell(rex, client, January), Is.EqualTo(300));
        Assert.That(pets.Available(), Is.Empty);
        Assert.That(() => pets.Sell(rex, client, January), Throws.InvalidOperationException);
    }

    [Test]
    public void MonthlyAndAnnualReports()
    {
        context.Employees.Add(new Employee { Name = "Groomer", MonthlySalary = 100 });
        var kibble = products.Buy("Acme", "Kibble", ProductType.Food, 10, 2, 5, January);
        products.Buy("Toys Ltd", "Ball", ProductType.Toy, 4, 3, 10, January);
        var client = clients.Register("Pesho", withClientCard: false);
        products.Sell(client, kibble, 5, January);
        salon.Groom(client, GroomingService.Bathing, February);

        var january = reports.GetMonthlyReport(2026, 1);
        var year = reports.GetAnnualReport(2026);

        Assert.That(
            (january.Revenue, january.PurchaseCosts, january.Salaries, january.Profit),
            Is.EqualTo((25m, 32m, 100m, -107m))
        );
        Assert.That(january.Distributors["Acme"].SoldPercentage, Is.EqualTo(50));
        Assert.That(january.Distributors["Toys Ltd"].SoldPercentage, Is.EqualTo(0));
        Assert.That(
            (year.Revenue, year.PurchaseCosts, year.Salaries, year.Profit),
            Is.EqualTo((55m, 32m, 1200m, -1177m))
        );
        Assert.That(year.Distributors["Acme"], Is.EqualTo(new PetStore.Services.Models.DistributorStats(10, 5)));
        Assert.That(year.Meets(-2000), Is.True);
        Assert.That(year.Meets(0), Is.False);
    }
}
