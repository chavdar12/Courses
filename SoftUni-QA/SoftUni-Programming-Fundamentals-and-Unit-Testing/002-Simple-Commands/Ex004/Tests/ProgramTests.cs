namespace Tests;

public class ProgramTests
{
    [TestCase("", "11\n20\n6")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}