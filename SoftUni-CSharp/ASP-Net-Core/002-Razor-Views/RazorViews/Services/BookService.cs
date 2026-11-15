using RazorViews.Models;

namespace RazorViews.Services;

public interface IBookService
{
    IReadOnlyList<Book> All();

    void Add(Book book);
}

public class BookService : IBookService
{
    private readonly List<Book> books =
    [
        new()
        {
            Id = 1,
            Title = "Clean Code",
            Author = "Robert Martin",
            Pages = 464,
        },
        new()
        {
            Id = 2,
            Title = "CLR via C#",
            Author = "Jeffrey Richter",
            Pages = 896,
        },
    ];

    public IReadOnlyList<Book> All() => books;

    public void Add(Book book)
    {
        book.Id = books.Max(b => b.Id) + 1;
        books.Add(book);
    }
}
