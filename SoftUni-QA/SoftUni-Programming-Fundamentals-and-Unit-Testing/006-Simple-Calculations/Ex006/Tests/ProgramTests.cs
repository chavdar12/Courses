namespace Tests;

public class ProgramTests
{
    [TestCase("212\n20\n2", "5")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}