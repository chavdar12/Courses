namespace Tests;

public class ProgramTests
{
    [TestCase("1\n3\n2", "3")]
    [TestCase("-5\n-2\n-9", "-2")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}