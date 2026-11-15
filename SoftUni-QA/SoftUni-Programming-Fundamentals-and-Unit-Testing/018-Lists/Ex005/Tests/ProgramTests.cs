using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("2 13 43 876 342 23 543\nContains 100\nContains 543\nPrintEven\nPrintOdd\nGetSum\nFilter >= 43\nend",
        "No such number\nYes\n2 876 342 \n13 43 23 543 \n1842\n43 876 342 543")]
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
