namespace Tests;

public class ProgramTests
{
    [TestCase("30", "7\n17\n27")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}