using AutoMapper;
using AutoMapper.QueryableExtensions;
using FastFood.Data;
using FastFood.Models;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FastFood.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeesController(FastFoodContext context, IMapper mapper) : ControllerBase
{
    // The positions an employee can be registered for.
    [HttpGet("Register")]
    public List<RegisterEmployeeViewModel> Register() =>
        context.Positions.ProjectTo<RegisterEmployeeViewModel>(mapper.ConfigurationProvider).ToList();

    [HttpPost("Register")]
    public IActionResult Register(RegisterEmployeeInputModel model)
    {
        if (!context.Positions.Any(p => p.Id == model.PositionId))
        {
            return BadRequest("Invalid position.");
        }

        context.Employees.Add(mapper.Map<Employee>(model));
        context.SaveChanges();

        return RedirectToAction(nameof(All));
    }

    [HttpGet("All")]
    public List<EmployeesAllViewModel> All() =>
        context.Employees.ProjectTo<EmployeesAllViewModel>(mapper.ConfigurationProvider).ToList();
}
