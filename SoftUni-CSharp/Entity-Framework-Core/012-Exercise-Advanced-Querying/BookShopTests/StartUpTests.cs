using BookShop;
using BookShop.Data;
using BookShop.Models;
using BookShop.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace BookShopTests;

public class StartUpTests
{
    private BookShopContext context;

    [SetUp]
    public void SetUp()
    {
        context = new BookShopContext(new DbContextOptionsBuilder<BookShopContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

        var george = new Author { FirstName = "George", LastName = "Powell" };
        var jane = new Author { FirstName = "Jane", LastName = "Ortiz" };
        var randy = new Author { FirstName = "Randy", LastName = "Morales" };
        var bozhidara = new Author { FirstName = "Bozhidara", LastName = "Rysinova" };
        var stanko = new Author { FirstName = "Stanko", LastName = "Popov" };

        var horror = new Category { Name = "Horror" };
        var mystery = new Category { Name = "Mystery" };
        var drama = new Category { Name = "Drama" };
        var art = new Category { Name = "Art" };

        context.Books.AddRange(
            Book(1, "A Farewell to Arms", new DateTime(1990, 5, 1), 3000, 45.00m, EditionType.Gold, AgeRestriction.Minor, george, drama),
            Book(2, "A Scanner Darkly", new DateTime(2012, 1, 1), 8000, 20.00m, EditionType.Normal, AgeRestriction.Teen, jane, horror, art),
            Book(3, "The Skull Beneath the Skin", new DateTime(1985, 3, 10), 4100, 48.63m, EditionType.Gold, AgeRestriction.Adult, bozhidara, mystery),
            Book(4, "Postern of Fate", new DateTime(2000, 7, 7), 4500, 10.50m, EditionType.Promo, AgeRestriction.Minor, stanko, mystery, drama),
            Book(5, "Great Work of Time", null, 6000, 41.00m, EditionType.Normal, AgeRestriction.Teen, randy, art),
            Book(6, "Precious Bane", new DateTime(2015, 2, 2), 7000, 15.00m, EditionType.Gold, AgeRestriction.Adult, stanko, art));
        context.SaveChanges();
        context.ChangeTracker.Clear();
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [TestCase("miNor", "A Farewell to Arms\nPostern of Fate")]
    [TestCase("teEN", "A Scanner Darkly\nGreat Work of Time")]
    public void BooksByAgeRestrictionIgnoresCase(string command, string expected)
    {
        Assert.That(StartUp.GetBooksByAgeRestriction(context, command), Is.EqualTo(expected));
    }

    [Test]
    public void GoldenBooks()
    {
        Assert.That(StartUp.GetGoldenBooks(context), Is.EqualTo("A Farewell to Arms\nThe Skull Beneath the Skin"));
    }

    [Test]
    public void BooksByPrice()
    {
        Assert.That(StartUp.GetBooksByPrice(context), Is.EqualTo(
            "The Skull Beneath the Skin - $48.63\nA Farewell to Arms - $45.00\nGreat Work of Time - $41.00"));
    }

    [Test]
    public void BooksNotReleasedInSkipsBooksWithoutReleaseDate()
    {
        Assert.That(StartUp.GetBooksNotReleasedIn(context, 2000), Is.EqualTo(
            "A Farewell to Arms\nA Scanner Darkly\nThe Skull Beneath the Skin\nPrecious Bane"));
    }

    [Test]
    public void BooksByCategory()
    {
        Assert.That(StartUp.GetBooksByCategory(context, "horror  MYSTERY"), Is.EqualTo(
            "A Scanner Darkly\nPostern of Fate\nThe Skull Beneath the Skin"));
    }

    [Test]
    public void BooksReleasedBefore()
    {
        Assert.That(StartUp.GetBooksReleasedBefore(context, "12-04-1992"), Is.EqualTo(
            "A Farewell to Arms - Gold - $45.00\nThe Skull Beneath the Skin - Gold - $48.63"));
    }

    [TestCase("e", "George Powell\nJane Ortiz")]
    [TestCase("dy", "Randy Morales")]
    public void AuthorNamesEndingIn(string input, string expected)
    {
        Assert.That(StartUp.GetAuthorNamesEndingIn(context, input), Is.EqualTo(expected));
    }

    [TestCase("sK", "The Skull Beneath the Skin")]
    [TestCase("WOR", "Great Work of Time")]
    public void BookTitlesContaining(string input, string expected)
    {
        Assert.That(StartUp.GetBookTitlesContaining(context, input), Is.EqualTo(expected));
    }

    [TestCase("po", "A Farewell to Arms (George Powell)\nPostern of Fate (Stanko Popov)\nPrecious Bane (Stanko Popov)")]
    [TestCase("R", "The Skull Beneath the Skin (Bozhidara Rysinova)")]
    public void BooksByAuthor(string input, string expected)
    {
        Assert.That(StartUp.GetBooksByAuthor(context, input), Is.EqualTo(expected));
    }

    [TestCase(15, 4)]
    [TestCase(20, 1)]
    public void CountBooks(int lengthCheck, int expected)
    {
        Assert.That(StartUp.CountBooks(context, lengthCheck), Is.EqualTo(expected));
    }

    [Test]
    public void CopiesByAuthor()
    {
        Assert.That(StartUp.CountCopiesByAuthor(context), Is.EqualTo(
            "Stanko Popov - 11500\nJane Ortiz - 8000\nRandy Morales - 6000\nBozhidara Rysinova - 4100\nGeorge Powell - 3000"));
    }

    [Test]
    public void TotalProfitByCategory()
    {
        Assert.That(StartUp.GetTotalProfitByCategory(context), Is.EqualTo(
            "Art $511000.00\nMystery $246633.00\nDrama $182250.00\nHorror $160000.00"));
    }

    [Test]
    public void MostRecentBooksTakesTopThreePerCategory()
    {
        var result = StartUp.GetMostRecentBooks(context);

        Assert.That(result, Does.StartWith("--Art\nPrecious Bane (2015)\nA Scanner Darkly (2012)\n"));
        Assert.That(result, Does.EndWith("--Mystery\nPostern of Fate (2000)\nThe Skull Beneath the Skin (1985)"));
    }

    [Test]
    public void IncreasePricesOnlyForBooksBefore2010()
    {
        StartUp.IncreasePrices(context);

        Assert.That(context.Books.OrderBy(b => b.BookId).Select(b => b.Price), Is.EqualTo(new[] { 50.00m, 20.00m, 53.63m, 15.50m, 41.00m, 15.00m }));
    }

    [Test]
    public void RemoveBooksWithFewerThan4200Copies()
    {
        Assert.That(StartUp.RemoveBooks(context), Is.EqualTo(2));
        Assert.That(context.Books.Count(), Is.EqualTo(4));
    }

    private static Book Book(int id, string title, DateTime? released, int copies, decimal price, EditionType edition, AgeRestriction age,
        Author author, params Category[] categories)
    {
        var book = new Book
        {
            BookId = id, Title = title, Description = title, ReleaseDate = released, Copies = copies, Price = price, EditionType = edition,
            AgeRestriction = age, Author = author
        };
        foreach (var category in categories)
        {
            book.BookCategories.Add(new BookCategory { Category = category });
        }

        return book;
    }
}
