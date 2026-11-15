using System.ComponentModel.DataAnnotations;

namespace Security.Models;

public record RegisterModel([Required, EmailAddress] string Email, [Required] string Password, [Required, StringLength(50)] string FullName);

public record LoginModel([Required] string Email, [Required] string Password);
