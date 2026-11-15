namespace Tests;

public class ProgramTests
{
    [TestCase("3\n10\n20\n30", "30 20 10")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}