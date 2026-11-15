namespace Tests;

public class ProgramTests
{
    [TestCase("water\n5", "5.00")]
    [TestCase("coffee\n2", "3.00")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex009", input), Is.EqualTo(expected));
    }
}