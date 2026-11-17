using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("MyPass123", "Password is valid")]
    [TestCase("logIn", "Password must be between 6 and 10 characters\nPassword must have at least 2 digits")]
    [TestCase("Pa$s$s", "Password must consist only of letters and digits\nPassword must have at least 2 digits")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(Run(input), Is.EqualTo(expected));
    }

    // Runs Ex009's Main with fake stdin and returns its stdout.
    private static string Run(string input)
    {
        var originalIn = Console.In;
        var originalOut = Console.Out;
        var output = new StringWriter();
        try
        {
            Console.SetIn(new StringReader(input));
            Console.SetOut(output);
            Assembly.Load("Ex009").EntryPoint!.Invoke(null, [Array.Empty<string>()]);
        }
        finally
        {
            Console.SetIn(originalIn);
            Console.SetOut(originalOut);
        }

        return output.ToString().ReplaceLineEndings("\n").TrimEnd();
    }
}
