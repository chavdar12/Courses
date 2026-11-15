namespace Tests;

public class ProgramTests
{
    [TestCase("2", "2 days before the exam\n1 days before the exam\nThe exam has come")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}