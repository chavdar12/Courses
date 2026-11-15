namespace Tests;

public class ProgramTests
{
    [TestCase("100", "88.00")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}