namespace Tests;

public class ProgramTests
{
    [TestCase("5\n1\n2\n5", "2.4")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}