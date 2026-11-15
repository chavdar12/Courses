namespace Tests;

public class ProgramTests
{
    [TestCase("50", "invalid")]
    [TestCase("150", "")]
    [TestCase("0", "")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}