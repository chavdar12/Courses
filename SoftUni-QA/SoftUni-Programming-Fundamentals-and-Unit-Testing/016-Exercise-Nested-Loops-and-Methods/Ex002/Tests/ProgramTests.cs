namespace Tests;

public class ProgramTests
{
    [TestCase("2", "112 121 211")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}