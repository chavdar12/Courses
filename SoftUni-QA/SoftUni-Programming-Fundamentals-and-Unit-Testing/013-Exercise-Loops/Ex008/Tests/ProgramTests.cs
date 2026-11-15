namespace Tests;

public class ProgramTests
{
    [TestCase("120\n-45.5\nEnd", "Increase: 120.00\nDecrease: 45.50\nBalance: 74.50")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex008", input), Is.EqualTo(expected));
    }
}