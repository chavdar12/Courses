namespace Tests;

public class ProgramTests
{
    [TestCase("2", "7")]
    [TestCase("8", "28")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}