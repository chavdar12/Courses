using Newtonsoft.Json;
using ProductShop.Data;
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

        Console.WriteLine(ImportUsers(context, Dataset("users.json")));
        Console.WriteLine(ImportProducts(context, Dataset("products.json")));
        Console.WriteLine(ImportCategories(context, Dataset("categories.json")));
        Console.WriteLine(ImportCategoryProducts(context, Dataset("categories-products.json")));
        Console.WriteLine(GetUsersWithProducts(context));
    }

    public static string Dataset(string name) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "Datasets", name));

    // 2. Import Users
    public static string ImportUsers(ProductShopContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<User[]>(inputJson));

    // 3. Import Products
    public static string ImportProducts(ProductShopContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<Product[]>(inputJson));

    // 4. Import Categories: records without a name are skipped
    public static string ImportCategories(ProductShopContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<Category[]>(inputJson).Where(c => c.Name != null).ToArray());

    // 5. Import Categories and Products
    public static string ImportCategoryProducts(ProductShopContext context, string inputJson) =>
        Import(context, JsonConvert.DeserializeObject<CategoryProduct[]>(inputJson));

    // Export Products in Range
    public static string GetProductsInRange(ProductShopContext context) =>
        Serialize(context.Products
            .Where(p => p.Price >= 500 && p.Price <= 1000)
            .OrderBy(p => p.Price)
            .Select(p => new { name = p.Name, price = p.Price, seller = p.Seller.FirstName + " " + p.Seller.LastName })
            .ToList());

    // 6. Export Successfully Sold Products
    public static string GetSoldProducts(ProductShopContext context) =>
        Serialize(context.Users
            .Where(u => u.ProductsSold.Any(p => p.BuyerId != null))
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .Select(u => new
            {
                firstName = u.FirstName,
                lastName = u.LastName,
                soldProducts = u.ProductsSold
                    .Where(p => p.BuyerId != null)
                    .OrderBy(p => p.Id)
                    .Select(p => new { name = p.Name, price = p.Price, buyerFirstName = p.Buyer.FirstName, buyerLastName = p.Buyer.LastName })
                    .ToList()
            })
            .ToList());

    // Export Categories by Products Count
    public static string GetCategoriesByProductsCount(ProductShopContext context) =>
        Serialize(context.Categories
            .OrderByDescending(c => c.CategoryProducts.Count)
            .Select(c => new
            {
                c.Name,
                Count = c.CategoryProducts.Count,
                Average = c.CategoryProducts.Average(cp => cp.Product.Price),
                Total = c.CategoryProducts.Sum(cp => cp.Product.Price)
            })
            .AsEnumerable()
            .Select(c => new { category = c.Name, productsCount = c.Count, averagePrice = c.Average.ToString("f2"), totalRevenue = c.Total.ToString("f2") })
            .ToList());

    // 7. Export Users and Products
    public static string GetUsersWithProducts(ProductShopContext context)
    {
        var users = context.Users
            .Where(u => u.ProductsSold.Any(p => p.BuyerId != null))
            .OrderByDescending(u => u.ProductsSold.Count(p => p.BuyerId != null))
            .ThenBy(u => u.Id)
            .Select(u => new
            {
                firstName = u.FirstName,
                lastName = u.LastName,
                age = u.Age,
                soldProducts = new
                {
                    count = u.ProductsSold.Count(p => p.BuyerId != null),
                    products = u.ProductsSold.Where(p => p.BuyerId != null).OrderBy(p => p.Id).Select(p => new { name = p.Name, price = p.Price }).ToList()
                }
            })
            .ToList();

        return Serialize(new { usersCount = users.Count, users }, NullValueHandling.Ignore);
    }

    private static string Import<T>(ProductShopContext context, T[] entities)
        where T : class
    {
        context.AddRange(entities);
        context.SaveChanges();

        return $"Successfully imported {entities.Length}";
    }

    private static string Serialize(object value, NullValueHandling nulls = NullValueHandling.Include) =>
        JsonConvert.SerializeObject(value, new JsonSerializerSettings { Formatting = Formatting.Indented, NullValueHandling = nulls });
}
