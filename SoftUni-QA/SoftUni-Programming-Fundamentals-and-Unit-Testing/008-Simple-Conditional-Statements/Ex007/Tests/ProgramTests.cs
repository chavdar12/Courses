namespace Tests;

public class ProgramTests
{
    [TestCase("30", "Slow")]
    [TestCase("31", "Fast")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}