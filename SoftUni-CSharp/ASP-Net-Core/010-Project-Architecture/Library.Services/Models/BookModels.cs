namespace Library.Services.Models;

// View-facing shapes: flat, no navigation properties, no EF types leak to the web layer.
public class BookListItem
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string AuthorName { get; set; }
}

public class BookDetails
{
    public int Id { get; set; }

    public string Title { get; set; }

    public int Year { get; set; }

    public string AuthorFirstName { get; set; }

    public string AuthorLastName { get; set; }
}

public class CreateBookModel
{
    public string Title { get; set; }

    public int Year { get; set; }

    public int AuthorId { get; set; }
}
