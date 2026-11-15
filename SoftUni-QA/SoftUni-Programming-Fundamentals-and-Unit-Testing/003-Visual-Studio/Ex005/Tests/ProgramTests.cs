namespace Tests;

public class ProgramTests
{
    [TestCase("Sofia\nBulgaria", "Sofia is in Bulgaria")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}