namespace Tests;

public class ProgramTests
{
    [TestCase("1", "1001 1010")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}