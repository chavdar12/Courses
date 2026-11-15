namespace Tests;

public class ProgramTests
{
    [TestCase("3\n5\n5", "222\n224\n232\n234\n252\n254")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex003", input), Is.EqualTo(expected));
    }
}