namespace Tests;

public class ProgramTests
{
    [TestCase("3\n5", "3\n4\n5")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}