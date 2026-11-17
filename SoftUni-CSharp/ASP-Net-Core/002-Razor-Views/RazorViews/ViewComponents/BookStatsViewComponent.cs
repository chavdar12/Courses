using Microsoft.AspNetCore.Mvc;
using RazorViews.Services;

namespace RazorViews.ViewComponents;

// Renders Views/Shared/Components/BookStats/Default.cshtml; has its own logic, unlike a partial.
public class BookStatsViewComponent(IBookService books) : ViewComponent
{
    public IViewComponentResult Invoke(string label)
    {
        var all = books.All();
        return View((Label: label, Count: all.Count, Pages: all.Sum(b => b.Pages)));
    }
}
