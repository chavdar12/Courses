namespace Tests;

public class ProgramTests
{
    [TestCase("3\n4\n5", "17.5")]
    [TestCase("8\n13\n7", "73.5")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}