namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3 4 5 6", "3")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}