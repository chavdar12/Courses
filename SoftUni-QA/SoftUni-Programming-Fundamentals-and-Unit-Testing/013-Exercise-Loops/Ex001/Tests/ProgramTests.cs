namespace Tests;

public class ProgramTests
{
    [TestCase("2\n10", "1024")]
    [TestCase("5\n0", "1")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}