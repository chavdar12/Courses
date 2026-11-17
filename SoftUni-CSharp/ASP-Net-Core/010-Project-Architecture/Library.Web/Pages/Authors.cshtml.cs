using Library.Data.Models;
using Library.Data.Repositories;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Library.Web.Pages;

// Razor Page: the handler and its view live together, no controller.
public class AuthorsModel(IRepository<Author> authors) : PageModel
{
    public List<(string Name, int Books)> Authors { get; private set; }

    public async Task OnGetAsync() =>
        Authors = (
            await authors.All().Select(a => new { Name = a.FirstName + " " + a.LastName, a.Books.Count }).ToListAsync()
        )
            .Select(a => (a.Name, a.Count))
            .ToList();
}
