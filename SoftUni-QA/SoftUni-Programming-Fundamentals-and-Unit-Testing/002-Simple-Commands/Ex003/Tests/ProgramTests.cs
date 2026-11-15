namespace Tests;

public class ProgramTests
{
    [TestCase("", "Chavdar\n8")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}