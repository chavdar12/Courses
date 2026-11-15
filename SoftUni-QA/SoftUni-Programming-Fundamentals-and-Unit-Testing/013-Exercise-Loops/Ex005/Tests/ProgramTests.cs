namespace Tests;

public class ProgramTests
{
    [TestCase("4\n2\n3\n4\n6", "75.00%\n50.00%\n25.00%")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}