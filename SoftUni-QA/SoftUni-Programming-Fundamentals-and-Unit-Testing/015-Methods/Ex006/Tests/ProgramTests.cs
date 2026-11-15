namespace Tests;

public class ProgramTests
{
    [TestCase("2\n8", "256")]
    [TestCase("5.5\n3", "166.375")]
    [TestCase("3\n0", "1")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}