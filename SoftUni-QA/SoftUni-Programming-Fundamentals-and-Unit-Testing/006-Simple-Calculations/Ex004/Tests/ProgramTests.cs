namespace Tests;

public class ProgramTests
{
    [TestCase("2\n3\n0.5\n0.5", "26")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}