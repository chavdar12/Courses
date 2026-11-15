namespace Tests;

public class ProgramTests
{
    [TestCase("a\nd", "a b c d")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}