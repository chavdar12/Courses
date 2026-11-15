using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Security.Services;

public class TokenService(IConfiguration configuration)
{
    public static SymmetricSecurityKey SigningKey(IConfiguration configuration)
    {
        var key = configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(key) || key.Length < 32)
        {
            throw new InvalidOperationException("Jwt:Key must be set (32+ chars) via user-secrets or environment.");
        }

        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
    }

    public string Create(IEnumerable<Claim> claims)
    {
        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: new SigningCredentials(SigningKey(configuration), SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
