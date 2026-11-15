namespace Tests;

public class ProgramTests
{
    [TestCase("echo", "echo")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}