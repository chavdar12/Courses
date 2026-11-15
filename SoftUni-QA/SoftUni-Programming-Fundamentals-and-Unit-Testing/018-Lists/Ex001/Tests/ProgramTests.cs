namespace Tests;

public class ProgramTests
{
    [TestCase("1 2 3 2\nDelete 2\nInsert 5 0\nend", "5 1 3")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}