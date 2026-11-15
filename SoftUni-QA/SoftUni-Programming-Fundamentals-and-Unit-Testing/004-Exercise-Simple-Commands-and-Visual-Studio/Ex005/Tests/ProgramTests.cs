namespace Tests;

public class ProgramTests
{
    [TestCase("3\n4\n5", "12")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}