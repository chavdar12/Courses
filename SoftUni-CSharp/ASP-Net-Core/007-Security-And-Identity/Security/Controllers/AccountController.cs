using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Security.Data;
using Security.Models;
using Security.Services;

namespace Security.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController(
    UserManager<ApplicationUser> users,
    SignInManager<ApplicationUser> signIn,
    TokenService tokens
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FullName = model.FullName,
        };
        var result = await users.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
            return ValidationProblem(
                new ValidationProblemDetails(
                    result
                        .Errors.GroupBy(e => e.Code)
                        .ToDictionary(g => g.Key, g => g.Select(e => e.Description).ToArray())
                )
            );
        }

        return Ok(new { user.Id });
    }

    // Cookie login through SignInManager (password check + lockout).
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var result = await signIn.PasswordSignInAsync(
            model.Email,
            model.Password,
            isPersistent: false,
            lockoutOnFailure: true
        );
        return result.Succeeded ? Ok() : Unauthorized();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signIn.SignOutAsync();
        return Ok();
    }

    // Stateless login: same credentials, a signed JWT instead of a cookie.
    [HttpPost("token")]
    public async Task<IActionResult> Token(LoginModel model)
    {
        var user = await users.FindByEmailAsync(model.Email);
        if (
            user is null
            || !(await signIn.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: true)).Succeeded
        )
        {
            return Unauthorized();
        }

        var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, user.Id), new(ClaimTypes.Name, user.UserName) };
        claims.AddRange((await users.GetRolesAsync(user)).Select(r => new Claim(ClaimTypes.Role, r)));
        claims.AddRange(await users.GetClaimsAsync(user));

        return Ok(new { token = tokens.Create(claims) });
    }
}
