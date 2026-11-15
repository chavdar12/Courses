using System.Linq.Expressions;
using Library.Data.Models;
using Library.Services.Models;

namespace Library.Services;

// Hand-written instead of AutoMapper: 14.x (last free) has unpatched CVEs and 15+ needs a license.
// Expressions, not methods, so EF translates them into the SELECT (what AutoMapper's ProjectTo does).
public static class Mappings
{
    public static readonly Expression<Func<Book, BookListItem>> ToListItem = b => new BookListItem
    {
        Id = b.Id,
        Title = b.Title,
        AuthorName = b.Author.FirstName + " " + b.Author.LastName,
    };

    public static readonly Expression<Func<Book, BookDetails>> ToDetails = b => new BookDetails
    {
        Id = b.Id,
        Title = b.Title,
        Year = b.Year,
        AuthorFirstName = b.Author.FirstName,
        AuthorLastName = b.Author.LastName,
    };

    public static Book ToEntity(this CreateBookModel model) =>
        new() { Title = model.Title, Year = model.Year, AuthorId = model.AuthorId };
}
