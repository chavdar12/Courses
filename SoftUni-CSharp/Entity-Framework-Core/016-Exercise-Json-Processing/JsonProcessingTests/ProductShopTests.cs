using Microsoft.EntityFrameworkCore;
using ProductShop;
using ProductShop.Data;

namespace JsonProcessingTests;

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
    public void ImportsReportCountsAndSkipNamelessCategories()
    {
        Assert.That(StartUp.ImportUsers(context, StartUp.Dataset("users.json")), Is.EqualTo("Successfully imported 5"));
        Assert.That(StartUp.ImportProducts(context, StartUp.Dataset("products.json")), Is.EqualTo("Successfully imported 7"));
        Assert.That(StartUp.ImportCategories(context, StartUp.Dataset("categories.json")), Is.EqualTo("Successfully imported 3"));
        Assert.That(StartUp.ImportCategoryProducts(context, StartUp.Dataset("categories-products.json")), Is.EqualTo("Successfully imported 7"));
    }

    [Test]
    public void ProductsInRange()
    {
        ImportAll();

        JsonAssert.AreEqual("""
            [
              { "name": "TRAMADOL HYDROCHLORIDE", "price": 516.48, "seller": "Chrissy Falconbridge" },
              { "name": "Allopurinol", "price": 518.50, "seller": "Kathy Gilbert" },
              { "name": "Parsley", "price": 999.99, "seller": "Gloria Alexander" }
            ]
            """, StartUp.GetProductsInRange(context));
    }

    [Test]
    public void SoldProducts()
    {
        ImportAll();

        JsonAssert.AreEqual("""
            [
              { "firstName": "Gloria", "lastName": "Alexander", "soldProducts": [
                { "name": "Metoprolol Tartrate", "price": 1405.74, "buyerFirstName": "Bonnie", "buyerLastName": "Fox" } ] },
              { "firstName": "Kathy", "lastName": "Gilbert", "soldProducts": [
                { "name": "Allopurinol", "price": 518.50, "buyerFirstName": "Bonnie", "buyerLastName": "Fox" } ] },
              { "firstName": null, "lastName": "Stewart", "soldProducts": [
                { "name": "Finasteride", "price": 1374.01, "buyerFirstName": "Chrissy", "buyerLastName": "Falconbridge" },
                { "name": "Glyburide", "price": 95.1, "buyerFirstName": "Gloria", "buyerLastName": "Alexander" } ] }
            ]
            """, StartUp.GetSoldProducts(context));
    }

    [Test]
    public void CategoriesByProductsCount()
    {
        ImportAll();

        JsonAssert.AreEqual("""
            [
              { "category": "Drugs", "productsCount": 4, "averagePrice": "953.68", "totalRevenue": "3814.73" },
              { "category": "Garden", "productsCount": 2, "averagePrice": "1187.00", "totalRevenue": "2374.00" },
              { "category": "Adult", "productsCount": 1, "averagePrice": "95.10", "totalRevenue": "95.10" }
            ]
            """, StartUp.GetCategoriesByProductsCount(context));
    }

    [Test]
    public void UsersWithProductsIgnoresNulls()
    {
        ImportAll();

        JsonAssert.AreEqual("""
            {
              "usersCount": 3,
              "users": [
                { "lastName": "Stewart", "soldProducts": { "count": 2, "products": [
                  { "name": "Finasteride", "price": 1374.01 }, { "name": "Glyburide", "price": 95.1 } ] } },
                { "firstName": "Gloria", "lastName": "Alexander", "age": 39, "soldProducts": { "count": 1, "products": [
                  { "name": "Metoprolol Tartrate", "price": 1405.74 } ] } },
                { "firstName": "Kathy", "lastName": "Gilbert", "soldProducts": { "count": 1, "products": [
                  { "name": "Allopurinol", "price": 518.50 } ] } }
              ]
            }
            """, StartUp.GetUsersWithProducts(context));
    }

    private void ImportAll()
    {
        StartUp.ImportUsers(context, StartUp.Dataset("users.json"));
        StartUp.ImportProducts(context, StartUp.Dataset("products.json"));
        StartUp.ImportCategories(context, StartUp.Dataset("categories.json"));
        StartUp.ImportCategoryProducts(context, StartUp.Dataset("categories-products.json"));
        context.ChangeTracker.Clear();
    }
}
