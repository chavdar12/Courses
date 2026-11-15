namespace Tests;

public class ProgramTests
{
    [TestCase("John\nSmith\nj@s.com", "Customer: John Smith (j@s.com)")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}