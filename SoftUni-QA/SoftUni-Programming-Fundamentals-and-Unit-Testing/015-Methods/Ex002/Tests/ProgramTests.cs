namespace Tests;

public class ProgramTests
{
    [TestCase("2.99", "Fail")]
    [TestCase("3.495", "Average")]
    [TestCase("4.50", "Very good")]
    [TestCase("5.6", "Excellent")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}