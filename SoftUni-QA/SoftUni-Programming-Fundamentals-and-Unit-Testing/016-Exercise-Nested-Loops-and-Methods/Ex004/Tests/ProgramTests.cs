namespace Tests;

public class ProgramTests
{
    [TestCase("a\nc\nb", "aaa aac aca acc caa cac cca ccc \n8")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex004", input), Is.EqualTo(expected));
    }
}