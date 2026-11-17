using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;

namespace Security.Controllers;

// XSS + CSRF demo: Razor encodes output; the form carries an antiforgery token.
public class CommentsController : Controller
{
    private static readonly ConcurrentQueue<string> Comments = new();

    public IActionResult Index() => View(Comments.ToArray());

    [HttpPost, ValidateAntiForgeryToken]
    public IActionResult Index(string text)
    {
        if (!string.IsNullOrWhiteSpace(text))
        {
            Comments.Enqueue(text);
        }

        return RedirectToAction(nameof(Index));
    }
}
