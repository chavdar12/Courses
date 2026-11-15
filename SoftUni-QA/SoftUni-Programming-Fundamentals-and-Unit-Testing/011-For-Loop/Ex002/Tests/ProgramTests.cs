namespace Tests;

public class ProgramTests
{
    [TestCase("4", "1+2+3+4=10")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}