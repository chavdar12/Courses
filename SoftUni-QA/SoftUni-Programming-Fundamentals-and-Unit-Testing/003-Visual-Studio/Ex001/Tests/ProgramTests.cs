namespace Tests;

public class ProgramTests
{
    [TestCase("", "Hello, SoftUni")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}