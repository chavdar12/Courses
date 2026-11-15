namespace Tests;

public class ProgramTests
{
    [TestCase("-12345", "54")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex008", input), Is.EqualTo(expected));
    }
}