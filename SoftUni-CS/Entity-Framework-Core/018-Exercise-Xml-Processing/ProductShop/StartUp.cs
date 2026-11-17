using ProductShop.Data;
using ProductShop.DTOs.Export;
using ProductShop.DTOs.Import;
using ProductShop.Models;

namespace ProductShop;

public class StartUp
{
    public static void Main()
    {
        using var context = new ProductShopContext();
        // Recreates the ProductShop database on every run so the imports start clean.
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        Console.WriteLine(ImportUsers(context, Dataset("users.xml")));
        Console.WriteLine(ImportProducts(context, Dataset("products.xml")));
        Console.WriteLine(ImportCategories(context, Dataset("categories.xml")));
        Console.WriteLine(ImportCategoryProducts(context, Dataset("categories-products.xml")));
        Console.WriteLine(GetUsersWithProducts(context));
    }

    public static string Dataset(string name) =>
        File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Datasets", name));

    // Import Users
    public static string ImportUsers(ProductShopContext context, string inputXml) =>
        Import(
            context,
            XmlHelper
                .Deserialize<ImportUserDto[]>(inputXml, "Users")
                .Select(u => new User
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Age = u.Age,
                })
                .ToArray()
        );

    // Import Products
    public static string ImportProducts(ProductShopContext context, string inputXml) =>
        Import(
            context,
            XmlHelper
                .Deserialize<ImportProductDto[]>(inputXml, "Products")
                .Select(p => new Product
                {
                    Name = p.Name,
                    Price = p.Price,
                    SellerId = p.SellerId,
                    BuyerId = p.BuyerId,
                })
                .ToArray()
        );

    // Import Categories: records without a name are skipped
    public static string ImportCategories(ProductShopContext context, string inputXml) =>
        Import(
            context,
            XmlHelper
                .Deserialize<ImportCategoryDto[]>(inputXml, "Categories")
                .Where(c => c.Name != null)
                .Select(c => new Category { Name = c.Name })
                .ToArray()
        );

    // Import Categories and Products: entries with an unknown category or product are skipped
    public static string ImportCategoryProducts(ProductShopContext context, string inputXml)
    {
        var categoryIds = context.Categories.Select(c => c.Id).ToHashSet();
        var productIds = context.Products.Select(p => p.Id).ToHashSet();

        return Import(
            context,
            XmlHelper
                .Deserialize<ImportCategoryProductDto[]>(inputXml, "CategoryProducts")
                .Where(cp => categoryIds.Contains(cp.CategoryId) && productIds.Contains(cp.ProductId))
                .Select(cp => new CategoryProduct { CategoryId = cp.CategoryId, ProductId = cp.ProductId })
                .ToArray()
        );
    }

    // Products In Range
    public static string GetProductsInRange(ProductShopContext context) =>
        XmlHelper.Serialize(
            context
                .Products.Where(p => p.Price >= 500 && p.Price <= 1000)
                .OrderBy(p => p.Price)
                .Take(10)
                .Select(p => new ExportProductInRangeDto
                {
                    Name = p.Name,
                    Price = p.Price,
                    Buyer = p.BuyerId == null ? null : p.Buyer.FirstName + " " + p.Buyer.LastName,
                })
                .ToArray(),
            "Products"
        );

    // Sold Products
    public static string GetSoldProducts(ProductShopContext context) =>
        XmlHelper.Serialize(
            context
                .Users.Where(u => u.ProductsSold.Any())
                .OrderBy(u => u.LastName)
                .ThenBy(u => u.FirstName)
                .Take(5)
                .Select(u => new ExportUserSoldProductsDto
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    SoldProducts = u
                        .ProductsSold.OrderBy(p => p.Id)
                        .Select(p => new ExportProductDto { Name = p.Name, Price = p.Price })
                        .ToArray(),
                })
                .ToArray(),
            "Users"
        );

    // Categories By Products Count
    public static string GetCategoriesByProductsCount(ProductShopContext context) =>
        XmlHelper.Serialize(
            context
                .Categories.Select(c => new ExportCategoryDto
                {
                    Name = c.Name,
                    Count = c.CategoryProducts.Count,
                    AveragePrice = c.CategoryProducts.Average(cp => cp.Product.Price),
                    TotalRevenue = c.CategoryProducts.Sum(cp => cp.Product.Price),
                })
                .OrderByDescending(c => c.Count)
                .ThenBy(c => c.TotalRevenue)
                .ToArray(),
            "Categories"
        );

    // Users and Products
    public static string GetUsersWithProducts(ProductShopContext context)
    {
        var users = context
            .Users.Where(u => u.ProductsSold.Any())
            .OrderByDescending(u => u.ProductsSold.Count)
            .ThenBy(u => u.Id)
            .Select(u => new ExportUserWithProductsDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Age = u.Age,
                SoldProducts = new ExportSoldProductsDto
                {
                    Count = u.ProductsSold.Count,
                    Products = u
                        .ProductsSold.OrderByDescending(p => p.Price)
                        .Select(p => new ExportProductDto { Name = p.Name, Price = p.Price })
                        .ToArray(),
                },
            })
            .ToArray();

        return XmlHelper.Serialize(
            new ExportUsersWithProductsDto { Count = users.Length, Users = users.Take(10).ToArray() },
            "Users"
        );
    }

    private static string Import<T>(ProductShopContext context, T[] entities)
        where T : class
    {
        context.AddRange(entities);
        context.SaveChanges();

        return $"Successfully imported {entities.Length}";
    }
}
