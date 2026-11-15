namespace Tests;

public class ProgramTests
{
    [TestCase("200\n3\n5.7", "202.85")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}