using CarDealer;
using CarDealer.Data;
using Microsoft.EntityFrameworkCore;

namespace XmlProcessingTests;

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
    public void ImportsSkipUnknownSuppliersPartsAndCars()
    {
        Assert.That(
            StartUp.ImportSuppliers(context, StartUp.Dataset("suppliers.xml")),
            Is.EqualTo("Successfully imported 3")
        );
        Assert.That(StartUp.ImportParts(context, StartUp.Dataset("parts.xml")), Is.EqualTo("Successfully imported 4"));
        Assert.That(StartUp.ImportCars(context, StartUp.Dataset("cars.xml")), Is.EqualTo("Successfully imported 4"));
        Assert.That(
            StartUp.ImportCustomers(context, StartUp.Dataset("customers.xml")),
            Is.EqualTo("Successfully imported 2")
        );
        Assert.That(StartUp.ImportSales(context, StartUp.Dataset("sales.xml")), Is.EqualTo("Successfully imported 3"));
        Assert.That(
            context.Cars.Where(c => c.Id == 1).SelectMany(c => c.PartsCars).Select(pc => pc.PartId),
            Is.EquivalentTo(new[] { 1, 2, 3 })
        );
    }

    [Test]
    public void CarsWithDistance()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <cars>
              <car><make>BMW</make><model>1M Coupe</model><travelled-distance>39826890</travelled-distance></car>
              <car><make>BMW</make><model>E88</model><travelled-distance>27453411</travelled-distance></car>
              <car><make>Opel</make><model>Astra</model><travelled-distance>516628215</travelled-distance></car>
            </cars>
            """,
            StartUp.GetCarsWithDistance(context)
        );
    }

    [Test]
    public void CarsFromMakeBmw()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <cars>
              <car id="3" model="1M Coupe" travelled-distance="39826890" />
              <car id="2" model="E88" travelled-distance="27453411" />
              <car id="4" model="E88" travelled-distance="1500" />
            </cars>
            """,
            StartUp.GetCarsFromMakeBmw(context)
        );
    }

    [Test]
    public void LocalSuppliers()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <suppliers>
              <suplier id="2" name="VF Corporation" parts-count="2" />
              <suplier id="3" name="Saks Inc" parts-count="1" />
            </suppliers>
            """,
            StartUp.GetLocalSuppliers(context)
        );
    }

    [Test]
    public void CarsWithTheirListOfParts()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <cars>
              <car make="Opel" model="Astra" travelled-distance="516628215"><parts>
                <part name="Master cylinder" price="130.99" />
                <part name="Water tank" price="100.99" />
                <part name="Front door handle" price="100.50" />
              </parts></car>
              <car make="BMW" model="1M Coupe" travelled-distance="39826890"><parts /></car>
              <car make="BMW" model="E88" travelled-distance="27453411"><parts><part name="Bonnet" price="1001.34" /></parts></car>
              <car make="BMW" model="E88" travelled-distance="1500"><parts><part name="Water tank" price="100.99" /></parts></car>
            </cars>
            """,
            StartUp.GetCarsWithTheirListOfParts(context)
        );
    }

    [Test]
    public void TotalSalesByCustomer()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <customers>
              <customer full-name="Hai Everton" bought-cars="1" spent-money="1001.34" />
              <customer full-name="Hipolito Lamoreaux" bought-cars="2" spent-money="433.47" />
            </customers>
            """,
            StartUp.GetTotalSalesByCustomer(context)
        );
    }

    [Test]
    public void SalesWithAppliedDiscount()
    {
        ImportAll();

        XmlAssert.AreEqual(
            """
            <sales>
              <sale><car make="Opel" model="Astra" travelled-distance="516628215" /><discount>30.00</discount>
                <customer-name>Hipolito Lamoreaux</customer-name><price>332.48</price><price-with-discount>232.74</price-with-discount></sale>
              <sale><car make="BMW" model="E88" travelled-distance="27453411" /><discount>10.00</discount>
                <customer-name>Hai Everton</customer-name><price>1001.34</price><price-with-discount>901.21</price-with-discount></sale>
              <sale><car make="BMW" model="E88" travelled-distance="1500" /><discount>0.00</discount>
                <customer-name>Hipolito Lamoreaux</customer-name><price>100.99</price><price-with-discount>100.99</price-with-discount></sale>
            </sales>
            """,
            StartUp.GetSalesWithAppliedDiscount(context)
        );
    }

    private void ImportAll()
    {
        StartUp.ImportSuppliers(context, StartUp.Dataset("suppliers.xml"));
        StartUp.ImportParts(context, StartUp.Dataset("parts.xml"));
        StartUp.ImportCars(context, StartUp.Dataset("cars.xml"));
        StartUp.ImportCustomers(context, StartUp.Dataset("customers.xml"));
        StartUp.ImportSales(context, StartUp.Dataset("sales.xml"));
        context.ChangeTracker.Clear();
    }
}
