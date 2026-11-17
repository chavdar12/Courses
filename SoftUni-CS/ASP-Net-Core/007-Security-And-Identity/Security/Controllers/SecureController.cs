using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Security.Data;

namespace Security.Controllers;

[ApiController]
[Authorize]
[Route("api/secure")]
public class SecureController(UserManager<ApplicationUser> users) : ControllerBase
{
    [HttpGet("me")]
    public IActionResult Me() => Ok(new { name = User.Identity!.Name, admin = User.IsInRole("Admin") });

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult Admin() => Ok("Welcome, admin");

    [HttpGet("payroll")]
    [Authorize(Policy = "EmployeesOnly")]
    public IActionResult Payroll() => Ok($"Employee #{User.FindFirstValue("EmployeeNumber")}");

    // Admin grants the claim the EmployeesOnly policy needs.
    [HttpPost("employees/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MakeEmployee(string userId, [FromQuery] string number)
    {
        var user = await users.FindByIdAsync(userId);
        if (user is null)
        {
            return NotFound();
        }

        await users.AddClaimAsync(user, new Claim("EmployeeNumber", number));
        return NoContent();
    }

    // Parameter tampering: the id comes from the URL, so check it against the signed-in user.
    [HttpGet("profile/{userId}")]
    public async Task<IActionResult> Profile(string userId)
    {
        if (userId != User.FindFirstValue(ClaimTypes.NameIdentifier) && !User.IsInRole("Admin"))
        {
            return Forbid();
        }

        var user = await users.FindByIdAsync(userId);
        return user is null ? NotFound() : Ok(new { user.Email, user.FullName });
    }
}
