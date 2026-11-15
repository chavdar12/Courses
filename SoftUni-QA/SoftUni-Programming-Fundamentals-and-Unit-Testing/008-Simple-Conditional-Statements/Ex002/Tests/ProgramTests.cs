namespace Tests;

public class ProgramTests
{
    [TestCase("3", "odd")]
    [TestCase("4", "even")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}