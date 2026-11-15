using Microsoft.EntityFrameworkCore;
using ProductShop;
using ProductShop.Data;

namespace XmlProcessingTests;

public class ProductShopTests
{
    private ProductShopContext context;

    [SetUp]
    public void SetUp()
    {
        context = new ProductShopContext(new DbContextOptionsBuilder<ProductShopContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void ImportsSkipNamelessCategoriesAndUnknownIds()
    {
        Assert.That(StartUp.ImportUsers(context, StartUp.Dataset("users.xml")), Is.EqualTo("Successfully imported 4"));
        Assert.That(StartUp.ImportProducts(context, StartUp.Dataset("products.xml")), Is.EqualTo("Successfully imported 5"));
        Assert.That(StartUp.ImportCategories(context, StartUp.Dataset("categories.xml")), Is.EqualTo("Successfully imported 2"));
        Assert.That(StartUp.ImportCategoryProducts(context, StartUp.Dataset("categories-products.xml")), Is.EqualTo("Successfully imported 5"));
    }

    [Test]
    public void ProductsInRangeOmitMissingBuyers()
    {
        ImportAll();
        var actual = StartUp.GetProductsInRange(context);

        Assert.That(actual, Does.StartWith("""<?xml version="1.0" encoding="utf-16"?>"""));
        XmlAssert.AreEqual("""
            <Products>
              <Product><name>TRAMADOL HYDROCHLORIDE</name><price>516.48</price></Product>
              <Product><name>Allopurinol</name><price>518.5</price><buyer>Wallas Duffyn</buyer></Product>
              <Product><name>Acnezzol Base</name><price>710.6</price><buyer>Chrissy Falconbridge</buyer></Product>
              <Product><name>ESIKA</name><price>879.37</price></Product>
            </Products>
            """, actual);
    }

    [Test]
    public void SoldProducts()
    {
        ImportAll();

        XmlAssert.AreEqual("""
            <Users>
              <User><firstName>Almire</firstName><lastName>Ainslee</lastName><soldProducts>
                <Product><name>Allopurinol</name><price>518.5</price></Product>
                <Product><name>Acnezzol Base</name><price>710.6</price></Product>
              </soldProducts></User>
              <User><firstName>Chrissy</firstName><lastName>Falconbridge</lastName><soldProducts>
                <Product><name>TRAMADOL HYDROCHLORIDE</name><price>516.48</price></Product>
              </soldProducts></User>
              <User><lastName>Stewart</lastName><soldProducts>
                <Product><name>ESIKA</name><price>879.37</price></Product>
                <Product><name>allergy eye</name><price>426.91</price></Product>
              </soldProducts></User>
            </Users>
            """, StartUp.GetSoldProducts(context));
    }

    [Test]
    public void CategoriesByProductsCount()
    {
        ImportAll();

        XmlAssert.AreEqual($"""
            <Categories>
              <Category><name>Adult</name><count>3</count><averagePrice>{2016.88m / 3}</averagePrice><totalRevenue>2016.88</totalRevenue></Category>
              <Category><name>Garden</name><count>2</count><averagePrice>517.49</averagePrice><totalRevenue>1034.98</totalRevenue></Category>
            </Categories>
            """, StartUp.GetCategoriesByProductsCount(context));
    }

    [Test]
    public void UsersWithProducts()
    {
        ImportAll();

        XmlAssert.AreEqual("""
            <Users>
              <count>3</count>
              <users>
                <User><firstName>Almire</firstName><lastName>Ainslee</lastName><age>33</age><SoldProducts><count>2</count><products>
                  <Product><name>Acnezzol Base</name><price>710.6</price></Product>
                  <Product><name>Allopurinol</name><price>518.5</price></Product>
                </products></SoldProducts></User>
                <User><lastName>Stewart</lastName><SoldProducts><count>2</count><products>
                  <Product><name>ESIKA</name><price>879.37</price></Product>
                  <Product><name>allergy eye</name><price>426.91</price></Product>
                </products></SoldProducts></User>
                <User><firstName>Chrissy</firstName><lastName>Falconbridge</lastName><age>50</age><SoldProducts><count>1</count><products>
                  <Product><name>TRAMADOL HYDROCHLORIDE</name><price>516.48</price></Product>
                </products></SoldProducts></User>
              </users>
            </Users>
            """, StartUp.GetUsersWithProducts(context));
    }

    private void ImportAll()
    {
        StartUp.ImportUsers(context, StartUp.Dataset("users.xml"));
        StartUp.ImportProducts(context, StartUp.Dataset("products.xml"));
        StartUp.ImportCategories(context, StartUp.Dataset("categories.xml"));
        StartUp.ImportCategoryProducts(context, StartUp.Dataset("categories-products.xml"));
        context.ChangeTracker.Clear();
    }
}
