using System.ComponentModel.DataAnnotations;
using WorkingWithData.Validation;

namespace WorkingWithData.Models;

public class RegisterUserModel : IValidatableObject
{
    [Required, StringLength(20, MinimumLength = 3)]
    public string Username { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required, MinLength(6)]
    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    [IsBefore("2010-01-01", ErrorMessage = "You must be born before 2010.")]
    public DateTime BirthDate { get; set; }

    // Cross-field rule: attributes see one property, this sees the whole object.
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Password != ConfirmPassword)
        {
            yield return new ValidationResult("Passwords do not match.", [nameof(ConfirmPassword)]);
        }
    }
}
