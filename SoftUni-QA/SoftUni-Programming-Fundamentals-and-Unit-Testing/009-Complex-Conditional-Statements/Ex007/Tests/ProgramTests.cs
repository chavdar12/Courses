namespace Tests;

public class ProgramTests
{
    [TestCase("e", "Vowel")]
    [TestCase("b", "Consonant")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}