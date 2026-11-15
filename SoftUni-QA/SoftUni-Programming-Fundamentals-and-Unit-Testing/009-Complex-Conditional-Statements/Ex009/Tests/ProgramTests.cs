namespace Tests;

public class ProgramTests
{
    [TestCase("Premiere\n10\n12", "1440.00")]
    [TestCase("Normal\n21\n13", "2047.50")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex009", input), Is.EqualTo(expected));
    }
}