using AutoMapper;
using AutoMapper.QueryableExtensions;
using FastFood.Data;
using FastFood.Models;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FastFood.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController(FastFoodContext context, IMapper mapper) : ControllerBase
{
    // The categories an item can be created in.
    [HttpGet("Create")]
    public List<CreateItemViewModel> Create() =>
        context.Categories.ProjectTo<CreateItemViewModel>(mapper.ConfigurationProvider).ToList();

    [HttpPost("Create")]
    public IActionResult Create(CreateItemInputModel model)
    {
        if (!context.Categories.Any(c => c.Id == model.CategoryId))
        {
            return BadRequest("Invalid category.");
        }

        context.Items.Add(mapper.Map<Item>(model));
        context.SaveChanges();

        return RedirectToAction(nameof(All));
    }

    [HttpGet("All")]
    public List<ItemsAllViewModels> All() =>
        context.Items.ProjectTo<ItemsAllViewModels>(mapper.ConfigurationProvider).ToList();
}
