namespace Tests;

public class ProgramTests
{
    [TestCase("5\n2", "5.00 + 2.00 = 7.00\n5.00 - 2.00 = 3.00\n5.00 * 2.00 = 10.00\n5.00 / 2.00 = 2.50")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}