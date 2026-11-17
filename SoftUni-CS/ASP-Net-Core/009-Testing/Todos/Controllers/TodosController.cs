using Microsoft.AspNetCore.Mvc;
using Todos.Services;

namespace Todos.Controllers;

public class TodosController(ITodoService todos) : Controller
{
    public async Task<IActionResult> Index() => View(await todos.GetAllAsync());

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return BadRequest("Title is required.");
        }

        await todos.AddAsync(title);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Complete(int id) =>
        await todos.CompleteAsync(id) ? RedirectToAction(nameof(Index)) : NotFound();
}
