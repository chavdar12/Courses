namespace Tests;

public class ProgramTests
{
    [TestCase("100\n3", "33.33")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}