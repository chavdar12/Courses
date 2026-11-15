namespace Tests;

public class ProgramTests
{
    [TestCase("12", "12 is special")]
    [TestCase("13", "13 is not special")]
    [TestCase("10", "10 is not special")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}