namespace Tests;

public class ProgramTests
{
    [TestCase("10", "1\n4\n7\n10")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}