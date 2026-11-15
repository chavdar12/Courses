namespace Tests;

public class ProgramTests
{
    [TestCase("", "Hello C#")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}