using System.Reflection;

namespace Tests;

public class ProgramTests
{
    [TestCase("3\n5\n5", "222\n224\n232\n234\n252\n254")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(Run(input), Is.EqualTo(expected));
    }

    // Runs Ex003's Main with fake stdin and returns its stdout.
    private static string Run(string input)
    {
        var originalIn = Console.In;
        var originalOut = Console.Out;
        var output = new StringWriter();
        try
        {
            Console.SetIn(new StringReader(input));
            Console.SetOut(output);
            Assembly.Load("Ex003").EntryPoint!.Invoke(null, [Array.Empty<string>()]);
        }
        finally
        {
            Console.SetIn(originalIn);
            Console.SetOut(originalOut);
        }

        return output.ToString().ReplaceLineEndings("\n").TrimEnd();
    }
}
