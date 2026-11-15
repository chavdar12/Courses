using System.Globalization;
using System.Text;
using BookShop.Data;
using BookShop.Models.Enums;

namespace BookShop;

public class StartUp
{
    public static void Main()
    {
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

        using var context = new BookShopContext();
        context.Database.EnsureCreated();

        Console.WriteLine(GetBooksByAgeRestriction(context, Console.ReadLine()));
    }

    // 2. Age Restriction
    public static string GetBooksByAgeRestriction(BookShopContext context, string command)
    {
        var restriction = Enum.Parse<AgeRestriction>(command, ignoreCase: true);

        return Lines(context.Books.Where(b => b.AgeRestriction == restriction).Select(b => b.Title).OrderBy(t => t));
    }

    // 3. Golden Books
    public static string GetGoldenBooks(BookShopContext context) =>
        Lines(context.Books
            .Where(b => b.EditionType == EditionType.Gold && b.Copies < 5000)
            .OrderBy(b => b.BookId)
            .Select(b => b.Title));

    // 4. Books by Price
    public static string GetBooksByPrice(BookShopContext context) =>
        Lines(context.Books
            .Where(b => b.Price > 40)
            .OrderByDescending(b => b.Price)
            .Select(b => $"{b.Title} - ${b.Price:f2}"));

    // 5. Not Released In
    public static string GetBooksNotReleasedIn(BookShopContext context, int year) =>
        Lines(context.Books
            .Where(b => b.ReleaseDate.HasValue && b.ReleaseDate.Value.Year != year)
            .OrderBy(b => b.BookId)
            .Select(b => b.Title));

    // 6. Book Titles by Category
    public static string GetBooksByCategory(BookShopContext context, string input)
    {
        var categories = input.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        return Lines(context.Books
            .Where(b => b.BookCategories.Any(bc => categories.Contains(bc.Category.Name.ToLower())))
            .Select(b => b.Title)
            .OrderBy(t => t));
    }

    // 7. Released Before Date
    public static string GetBooksReleasedBefore(BookShopContext context, string date)
    {
        var before = DateTime.ParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture);

        return Lines(context.Books
            .Where(b => b.ReleaseDate < before)
            .OrderByDescending(b => b.ReleaseDate)
            .Select(b => new { b.Title, b.EditionType, b.Price })
            .AsEnumerable()
            .Select(b => $"{b.Title} - {b.EditionType} - ${b.Price:f2}"));
    }

    // 8. Author Search
    public static string GetAuthorNamesEndingIn(BookShopContext context, string input) =>
        Lines(context.Authors
            .Where(a => a.FirstName.EndsWith(input))
            .Select(a => a.FirstName + " " + a.LastName)
            .OrderBy(name => name));

    // 9. Book Search
    public static string GetBookTitlesContaining(BookShopContext context, string input) =>
        Lines(context.Books
            .Where(b => b.Title.ToLower().Contains(input.ToLower()))
            .Select(b => b.Title)
            .OrderBy(t => t));

    // 10. Book Search by Author
    public static string GetBooksByAuthor(BookShopContext context, string input) =>
        Lines(context.Books
            .Where(b => b.Author.LastName.ToLower().StartsWith(input.ToLower()))
            .OrderBy(b => b.BookId)
            .Select(b => $"{b.Title} ({b.Author.FirstName} {b.Author.LastName})"));

    // 11. Count Books
    public static int CountBooks(BookShopContext context, int lengthCheck) =>
        context.Books.Count(b => b.Title.Length > lengthCheck);

    // 12. Total Book Copies
    public static string CountCopiesByAuthor(BookShopContext context) =>
        Lines(context.Authors
            .Select(a => new { a.FirstName, a.LastName, Copies = a.Books.Sum(b => b.Copies) })
            .OrderByDescending(a => a.Copies)
            .AsEnumerable()
            .Select(a => $"{a.FirstName} {a.LastName} - {a.Copies}"));

    // 13. Profit by Category
    public static string GetTotalProfitByCategory(BookShopContext context) =>
        Lines(context.Categories
            .Select(c => new { c.Name, Profit = c.CategoryBooks.Sum(cb => cb.Book.Copies * cb.Book.Price) })
            .OrderByDescending(c => c.Profit)
            .ThenBy(c => c.Name)
            .AsEnumerable()
            .Select(c => $"{c.Name} ${c.Profit:f2}"));

    // 14. Most Recent Books
    public static string GetMostRecentBooks(BookShopContext context)
    {
        var categories = context.Categories
            .OrderBy(c => c.Name)
            .Select(c => new
            {
                c.Name,
                Books = c.CategoryBooks
                    .OrderByDescending(cb => cb.Book.ReleaseDate)
                    .Take(3)
                    .Select(cb => new { cb.Book.Title, cb.Book.ReleaseDate })
                    .ToList()
            })
            .ToList();

        var result = new StringBuilder();
        foreach (var category in categories)
        {
            result.AppendLine($"--{category.Name}");
            foreach (var book in category.Books)
            {
                result.AppendLine($"{book.Title} ({book.ReleaseDate?.Year})");
            }
        }

        return result.ToString().TrimEnd();
    }

    // 15. Increase Prices
    public static void IncreasePrices(BookShopContext context)
    {
        foreach (var book in context.Books.Where(b => b.ReleaseDate.HasValue && b.ReleaseDate.Value.Year < 2010))
        {
            book.Price += 5;
        }

        context.SaveChanges();
    }

    // 16. Remove Books
    public static int RemoveBooks(BookShopContext context)
    {
        var books = context.Books.Where(b => b.Copies < 4200).ToList();

        context.Books.RemoveRange(books);
        context.SaveChanges();

        return books.Count;
    }

    private static string Lines(IEnumerable<string> lines) => string.Join(Environment.NewLine, lines);
}
