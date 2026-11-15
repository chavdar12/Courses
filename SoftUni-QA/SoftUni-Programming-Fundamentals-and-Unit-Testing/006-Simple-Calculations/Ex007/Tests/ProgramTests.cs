namespace Tests;

public class ProgramTests
{
    [TestCase("2\n3\n4\n25", "28.5")]
    [TestCase("2\n3\n4\n0", "38")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}