namespace Tests;

public class ProgramTests
{
    [TestCase("3\n4\n5", "Valid Triangle")]
    [TestCase("1\n2\n10", "Invalid Triangle")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex010", input), Is.EqualTo(expected));
    }
}