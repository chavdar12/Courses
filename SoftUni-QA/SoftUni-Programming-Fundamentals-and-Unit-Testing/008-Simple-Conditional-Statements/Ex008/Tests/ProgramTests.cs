using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("student", "$1.00")]
    [TestCase("regular", "$1.60")]
    [TestCase("vip", "Invalid ticket type!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(Run(input), Is.EqualTo(expected));
    }

    // Runs Ex008's Main with fake stdin and returns its stdout.
    private static string Run(string input)
    {
        var originalIn = Console.In;
        var originalOut = Console.Out;
        var output = new StringWriter();
        try
        {
            Console.SetIn(new StringReader(input));
            Console.SetOut(output);
            Assembly.Load("Ex008").EntryPoint!.Invoke(null, [Array.Empty<string>()]);
        }
        finally
        {
            Console.SetIn(originalIn);
            Console.SetOut(originalOut);
        }

        return output.ToString().ReplaceLineEndings("\n").TrimEnd();
    }
}
