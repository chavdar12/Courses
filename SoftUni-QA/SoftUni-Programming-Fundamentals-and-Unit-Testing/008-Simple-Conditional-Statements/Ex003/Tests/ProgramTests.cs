namespace Tests;

public class ProgramTests
{
    [TestCase("3", "three")]
    [TestCase("10", "out of range")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}