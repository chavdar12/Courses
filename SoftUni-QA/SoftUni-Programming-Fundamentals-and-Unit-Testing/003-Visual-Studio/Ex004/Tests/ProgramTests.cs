namespace Tests;

public class ProgramTests
{
    [TestCase("John\nSmith\nBulgaria\nSofia", "John Smith from Bulgaria - Sofia!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}