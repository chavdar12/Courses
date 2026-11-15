namespace Tests;

public class ProgramTests
{
    [TestCase("3", "1 \n1 2 \n1 2 3 \n1 2 \n1")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}