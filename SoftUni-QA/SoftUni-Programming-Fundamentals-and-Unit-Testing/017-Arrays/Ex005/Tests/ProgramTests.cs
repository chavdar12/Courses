using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3\n1 2 3", "Arrays are identical.")]
    [TestCase("1 2 3\n1 2 4", "Arrays are not identical.")]
    [TestCase("1 2\n1 2 3", "Arrays are not identical.")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(Run(input), Is.EqualTo(expected));
    }

    // Runs Ex005's Main with fake stdin and returns its stdout.
    private static string Run(string input)
    {
        var originalIn = Console.In;
        var originalOut = Console.Out;
        var output = new StringWriter();
        try
        {
            Console.SetIn(new StringReader(input));
            Console.SetOut(output);
            Assembly.Load("Ex005").EntryPoint!.Invoke(null, [Array.Empty<string>()]);
        }
        finally
        {
            Console.SetIn(originalIn);
            Console.SetOut(originalOut);
        }

        return output.ToString().ReplaceLineEndings("\n").TrimEnd();
    }
}
