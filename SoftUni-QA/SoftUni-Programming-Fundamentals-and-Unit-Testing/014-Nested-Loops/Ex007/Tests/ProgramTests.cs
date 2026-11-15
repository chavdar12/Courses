namespace Tests;

public class ProgramTests
{
    [TestCase("5\n2", "60.00")]
    [TestCase("15\n13", "210.00")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}