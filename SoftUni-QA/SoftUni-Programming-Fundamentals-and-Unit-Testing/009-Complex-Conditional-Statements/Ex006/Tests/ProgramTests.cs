namespace Tests;

public class ProgramTests
{
    [TestCase("3", "Wednesday")]
    [TestCase("8", "Error")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}