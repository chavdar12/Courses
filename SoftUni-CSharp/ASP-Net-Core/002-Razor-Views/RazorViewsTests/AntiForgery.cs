using System.Text.RegularExpressions;

namespace RazorViewsTests;

public static partial class AntiForgery
{
    // The client keeps the antiforgery cookie; the form's hidden field carries the matching token.
    public static async Task<string> GetTokenAsync(HttpClient client, string url)
    {
        var html = await client.GetStringAsync(url);
        return TokenField().Match(html).Groups[1].Value;
    }

    [GeneratedRegex("name=\"__RequestVerificationToken\" type=\"hidden\" value=\"([^\"]+)\"")]
    private static partial Regex TokenField();
}
