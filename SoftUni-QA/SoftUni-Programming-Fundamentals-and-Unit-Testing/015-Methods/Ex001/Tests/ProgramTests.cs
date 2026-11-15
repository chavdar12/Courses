namespace Tests;

public class ProgramTests
{
    [TestCase("2", "The number 2 is positive.")]
    [TestCase("0", "The number 0 is zero.")]
    [TestCase("-5", "The number -5 is negative.")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}