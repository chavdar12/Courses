namespace Tests;

public class ProgramTests
{
    [TestCase("coffee\nsugar", "Final price: $1.40")]
    [TestCase("tea\nno", "Final price: $0.60")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex011", input), Is.EqualTo(expected));
    }
}