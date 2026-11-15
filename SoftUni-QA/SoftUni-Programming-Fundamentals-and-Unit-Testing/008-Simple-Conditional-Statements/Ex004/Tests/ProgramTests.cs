namespace Tests;

public class ProgramTests
{
    [TestCase("5\n3", "Greater number: 5")]
    [TestCase("3\n5", "Greater number: 5")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}