using Microsoft.AspNetCore.Mvc;
using RazorViews.Models;
using RazorViews.Services;

namespace RazorViews.Controllers;

public class BooksController(IBookService books) : Controller
{
    public IActionResult Index() => View(books.All());

    public IActionResult Create() => View(new Book());

    [HttpPost, ValidateAntiForgeryToken]
    public IActionResult Create(Book book)
    {
        if (!ModelState.IsValid)
        {
            return View(book);
        }

        books.Add(book);
        return RedirectToAction(nameof(Index));
    }
}
