using Microsoft.AspNetCore.Mvc;
using WorkingWithData.Models;

namespace WorkingWithData.Controllers;

[Route("binding")]
public class BindingController : Controller
{
    // Each parameter names where its value comes from.
    [HttpPost("sources/{id:int}")]
    public IActionResult Sources(
        [FromRoute] int id,
        [FromQuery] string sort,
        [FromHeader(Name = "X-Client")] string client,
        [FromForm] string name
    ) =>
        Json(
            new
            {
                id,
                sort,
                client,
                name,
            }
        );

    [HttpGet("student")]
    public IActionResult Student(Student student) => ModelState.IsValid ? Json(student) : BadRequest(ModelState);

    [HttpPost("register")]
    public IActionResult Register(RegisterUserModel model) =>
        ModelState.IsValid ? Ok(new { model.Username }) : BadRequest(ModelState);
}
