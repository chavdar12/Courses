namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3\n3 4 1", "1 3")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}