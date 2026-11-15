namespace Tests;

public class ProgramTests
{
    [TestCase("square\n5", "25.00")]
    [TestCase("rectangle\n7\n2.5", "17.50")]
    [TestCase("circle\n6", "113.10")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex009", input), Is.EqualTo(expected));
    }
}