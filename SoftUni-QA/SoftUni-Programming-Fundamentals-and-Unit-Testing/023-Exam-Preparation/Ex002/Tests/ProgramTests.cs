namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3 4", "2.50")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}