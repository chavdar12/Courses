namespace Tests;

public class ProgramTests
{
    [TestCase("2\n-3\n-4", "positive")]
    [TestCase("-1\n2\n3", "negative")]
    [TestCase("0\n5\n1", "zero")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex008", input), Is.EqualTo(expected));
    }
}