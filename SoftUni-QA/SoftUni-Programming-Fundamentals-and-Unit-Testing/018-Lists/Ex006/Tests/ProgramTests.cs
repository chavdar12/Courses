namespace Tests;

public class ProgramTests
{
    [TestCase("", "Hello, World!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}