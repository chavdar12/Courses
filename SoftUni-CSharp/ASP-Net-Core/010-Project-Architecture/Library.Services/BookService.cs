using Library.Data.Models;
using Library.Data.Repositories;
using Library.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services;

public interface IBookService
{
    Task<List<BookListItem>> AllAsync();

    Task<BookDetails> DetailsAsync(int id);

    Task<int> CreateAsync(CreateBookModel model);
}

public class BookService(IRepository<Book> books, IRepository<Author> authors) : IBookService
{
    // Select(expression) becomes the SQL SELECT, so only the needed columns are read.
    public Task<List<BookListItem>> AllAsync() =>
        books.All().OrderBy(b => b.Title).Select(Mappings.ToListItem).ToListAsync();

    public Task<BookDetails> DetailsAsync(int id) =>
        books.All().Where(b => b.Id == id).Select(Mappings.ToDetails).FirstOrDefaultAsync();

    public async Task<int> CreateAsync(CreateBookModel model)
    {
        if (!await authors.All().AnyAsync(a => a.Id == model.AuthorId))
        {
            throw new ArgumentException($"Author {model.AuthorId} does not exist.", nameof(model));
        }

        var book = model.ToEntity();
        await books.AddAsync(book);
        await books.SaveChangesAsync();
        return book.Id;
    }
}
