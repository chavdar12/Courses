namespace Tests;

public class ProgramTests
{
    [TestCase("2", "Minutes = 2880")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}