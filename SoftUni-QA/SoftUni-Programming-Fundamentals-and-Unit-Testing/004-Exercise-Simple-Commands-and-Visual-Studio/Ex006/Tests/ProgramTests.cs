namespace Tests;

public class ProgramTests
{
    [TestCase("5", "12.7")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}