namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3\n1 2 3", "Arrays are identical.")]
    [TestCase("1 2 3\n1 2 4", "Arrays are not identical.")]
    [TestCase("1 2\n1 2 3", "Arrays are not identical.")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}