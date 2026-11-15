namespace Tests;

public class ProgramTests
{
    [TestCase("101", "The water is boiling")]
    [TestCase("100", "The water is not hot enough")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}