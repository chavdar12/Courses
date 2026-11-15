namespace Tests;

public class ProgramTests
{
    [TestCase("sushi", "food")]
    [TestCase("juice", "drink")]
    [TestCase("rock", "unknown")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}