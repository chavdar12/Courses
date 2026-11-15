namespace Tests;

public class ProgramTests
{
    [TestCase("2\n3", "17.00 lv.")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex006", input), Is.EqualTo(expected));
    }
}