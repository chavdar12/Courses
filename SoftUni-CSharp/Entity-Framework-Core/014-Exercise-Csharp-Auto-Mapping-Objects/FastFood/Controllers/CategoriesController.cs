using AutoMapper;
using AutoMapper.QueryableExtensions;
using FastFood.Data;
using FastFood.Models;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FastFood.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController(FastFoodContext context, IMapper mapper) : ControllerBase
{
    [HttpPost("Create")]
    public IActionResult Create(CreateCategoryInputModel model)
    {
        context.Categories.Add(mapper.Map<Category>(model));
        context.SaveChanges();

        return RedirectToAction(nameof(All));
    }

    [HttpGet("All")]
    public List<CategoryAllViewModel> All() =>
        context.Categories.ProjectTo<CategoryAllViewModel>(mapper.ConfigurationProvider).ToList();
}
