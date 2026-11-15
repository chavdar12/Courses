using Library.Services;
using Library.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.Web.Controllers;

// Thin controller: HTTP in, service call, view out. No EF here.
public class BooksController(IBookService books) : Controller
{
    public async Task<IActionResult> Index() => View(await books.AllAsync());

    public async Task<IActionResult> Details(int id) =>
        await books.DetailsAsync(id) is { } book ? View(book) : NotFound();

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateBookModel model)
    {
        try
        {
            var id = await books.CreateAsync(model);
            return RedirectToAction(nameof(Details), new { id });
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }
}
