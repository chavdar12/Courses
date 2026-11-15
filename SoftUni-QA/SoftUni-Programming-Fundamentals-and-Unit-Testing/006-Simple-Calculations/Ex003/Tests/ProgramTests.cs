namespace Tests;

public class ProgramTests
{
    [TestCase("2\n3\n1.5\n2", "9.00")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}