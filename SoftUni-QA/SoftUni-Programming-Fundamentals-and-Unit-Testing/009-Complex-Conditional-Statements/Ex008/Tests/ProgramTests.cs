namespace Tests;

public class ProgramTests
{
    [TestCase("1\n2\n3", "Ascending")]
    [TestCase("3\n2\n1", "Descending")]
    [TestCase("1\n3\n2", "Not sorted")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex008", input), Is.EqualTo(expected));
    }
}