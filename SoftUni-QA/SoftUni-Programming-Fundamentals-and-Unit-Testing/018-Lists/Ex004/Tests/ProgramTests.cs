namespace Tests;

public class ProgramTests
{
    [TestCase("4 19 2 53 6 43\nAdd 3\nRemove 2\nRemoveAt 1\nInsert 8 3\nend", "4 53 6 8 43 3")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}