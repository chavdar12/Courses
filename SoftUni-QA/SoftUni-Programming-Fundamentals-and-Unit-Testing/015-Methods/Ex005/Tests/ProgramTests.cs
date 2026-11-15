namespace Tests;

public class ProgramTests
{
    [TestCase("abc\n3", "abcabcabc")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}