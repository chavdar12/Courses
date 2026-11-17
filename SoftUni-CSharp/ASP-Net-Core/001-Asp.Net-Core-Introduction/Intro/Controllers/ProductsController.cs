using Intro.Models;
using Microsoft.AspNetCore.Mvc;

namespace Intro.Controllers;

// Attribute routing with constraints; overrides the conventional route for this controller.
[Route("products")]
public class ProductsController : Controller
{
    private static readonly Product[] Products =
    [
        new(1, "Keyboard", 49.90m),
        new(2, "Mouse", 19.90m),
        new(3, "Monitor", 249.00m),
    ];

    [HttpGet("")]
    public IActionResult All() => View(Products);

    [HttpGet("{id:int}")]
    public IActionResult Details(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        return product is null ? NotFound() : View(product);
    }
}
