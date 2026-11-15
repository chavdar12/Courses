using AutoMapper;
using AutoMapper.QueryableExtensions;
using FastFood.Data;
using FastFood.Models;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FastFood.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController(FastFoodContext context, IMapper mapper) : ControllerBase
{
    // The item and employee ids an order can be created with.
    [HttpGet("Create")]
    public CreateOrderViewModel Create() =>
        new()
        {
            Items = context.Items.Select(i => i.Id).ToList(),
            Employees = context.Employees.Select(e => e.Id).ToList(),
        };

    [HttpPost("Create")]
    public IActionResult Create(CreateOrderInputModel model)
    {
        if (!context.Items.Any(i => i.Id == model.ItemId) || !context.Employees.Any(e => e.Id == model.EmployeeId))
        {
            return BadRequest("Invalid item or employee.");
        }

        context.Orders.Add(mapper.Map<Order>(model));
        context.SaveChanges();

        return RedirectToAction(nameof(All));
    }

    [HttpGet("All")]
    public List<OrderAllViewModel> All() =>
        context.Orders.ProjectTo<OrderAllViewModel>(mapper.ConfigurationProvider).ToList();
}
