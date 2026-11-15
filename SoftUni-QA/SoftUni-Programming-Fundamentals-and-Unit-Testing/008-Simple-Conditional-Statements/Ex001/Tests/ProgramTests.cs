namespace Tests;

public class ProgramTests
{
    [TestCase("-5", "Freezing weather!")]
    [TestCase("5", "")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}