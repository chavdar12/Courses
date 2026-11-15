using Library.Data;
using Library.Data.Models;
using Library.Data.Repositories;
using Library.Services;
using Library.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryTests;

public class BookServiceTests
{
    private LibraryDbContext db;
    private BookService service;
    private Author author;

    [SetUp]
    public void SetUp()
    {
        db = new LibraryDbContext(new DbContextOptionsBuilder<LibraryDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);
        author = new Author { FirstName = "Ursula", LastName = "Le Guin" };
        db.Authors.Add(author);
        db.SaveChanges();

        service = new BookService(new EfRepository<Book>(db), new EfRepository<Author>(db));
    }

    [TearDown]
    public void TearDown() => db.Dispose();

    [Test]
    public async Task CreateThenReadBack()
    {
        var id = await service.CreateAsync(new CreateBookModel { Title = "The Dispossessed", Year = 1974, AuthorId = author.Id });

        var details = await service.DetailsAsync(id);
        var all = await service.AllAsync();

        Assert.That(details.Title, Is.EqualTo("The Dispossessed"));
        Assert.That(all.Single().AuthorName, Is.EqualTo("Ursula Le Guin"));
    }

    [Test]
    public void CreateWithUnknownAuthorFails()
    {
        Assert.ThrowsAsync<ArgumentException>(() => service.CreateAsync(new CreateBookModel { Title = "X", AuthorId = 999 }));
    }

    [Test]
    public void MappingsFlattenAuthor()
    {
        var book = new Book { Id = 1, Title = "Mort", Year = 1987, Author = new Author { FirstName = "Terry", LastName = "Pratchett" } };

        Assert.That(Mappings.ToListItem.Compile()(book).AuthorName, Is.EqualTo("Terry Pratchett"));
        Assert.That(Mappings.ToDetails.Compile()(book).AuthorLastName, Is.EqualTo("Pratchett"));
    }

    [Test]
    public async Task MissingBookIsNull()
    {
        Assert.That(await service.DetailsAsync(42), Is.Null);
    }
}
