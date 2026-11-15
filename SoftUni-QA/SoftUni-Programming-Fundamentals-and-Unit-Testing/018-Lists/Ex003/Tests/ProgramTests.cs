namespace Tests;

public class ProgramTests
{
    [TestCase("10 -5 7 9 -33 50", "50 9 7 10")]
    [TestCase("-1 -2", "empty")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}