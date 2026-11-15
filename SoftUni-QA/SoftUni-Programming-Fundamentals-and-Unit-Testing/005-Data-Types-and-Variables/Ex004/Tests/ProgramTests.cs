namespace Tests;

public class ProgramTests
{
    [TestCase("1500", "1.50")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}