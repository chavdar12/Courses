namespace Tests;

public class ProgramTests
{
    [TestCase("2", "* * \n* * \nHello, SoftUni")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}