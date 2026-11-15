using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("2.99", "Fail")]
    [TestCase("3.495", "Average")]
    [TestCase("4.50", "Very good")]
    [TestCase("5.6", "Excellent")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(Run(input), Is.EqualTo(expected));
    }

    // Runs Ex002's Main with fake stdin and returns its stdout.
    private static string Run(string input)
    {
        var originalIn = Console.In;
        var originalOut = Console.Out;
        var output = new StringWriter();
        try
        {
            Console.SetIn(new StringReader(input));
            Console.SetOut(output);
            Assembly.Load("Ex002").EntryPoint!.Invoke(null, [Array.Empty<string>()]);
        }
        finally
        {
            Console.SetIn(originalIn);
            Console.SetOut(originalOut);
        }

        return output.ToString().ReplaceLineEndings("\n").TrimEnd();
    }
}
