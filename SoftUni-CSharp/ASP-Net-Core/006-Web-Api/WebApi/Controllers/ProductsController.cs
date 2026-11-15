using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;

namespace WebApi.Controllers;

// [ApiController]: automatic 400 with ProblemDetails on invalid models, binding from body by default.
[ApiController]
[Route("api/[controller]")]
public class ProductsController(ShopDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<Product>> GetAll() =>
        await db.Products.AsNoTracking().OrderBy(p => p.Id).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> Get(int id) =>
        await db.Products.FindAsync(id) is { } product ? product : NotFound();

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        product.Id = 0;
        db.Products.Add(product);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Product input)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        product.Name = input.Name;
        product.Price = input.Price;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        db.Products.Remove(product);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
