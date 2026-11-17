using Microsoft.AspNetCore.Identity;

namespace Security.Data;

// Extending Identity: extra columns live on our own user type.
public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; }
}
