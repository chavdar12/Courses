using AutoMapper;
using AutoMapper.QueryableExtensions;
using FastFood.Data;
using FastFood.Models;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FastFood.Controllers;

[ApiController]
[Route("[controller]")]
public class PositionsController(FastFoodContext context, IMapper mapper) : ControllerBase
{
    [HttpPost("Create")]
    public IActionResult Create(CreatePositionInputModel model)
    {
        context.Positions.Add(mapper.Map<Position>(model));
        context.SaveChanges();

        return RedirectToAction(nameof(All));
    }

    [HttpGet("All")]
    public List<PositionsAllViewModel> All() =>
        context.Positions.ProjectTo<PositionsAllViewModel>(mapper.ConfigurationProvider).ToList();
}
