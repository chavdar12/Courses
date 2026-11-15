namespace Tests;

public class ProgramTests
{
    [TestCase("3\n1\n2.5\n3", "6.5")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}