namespace Tests;

public class ProgramTests
{
    [TestCase("2", "Area = 12.57\nPerimeter = 12.57")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}