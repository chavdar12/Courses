namespace Tests;

public class ProgramTests
{
    [TestCase("int\n2\n16", "16")]
    [TestCase("char\na\nz", "z")]
    [TestCase("string\naaa\nbbb", "bbb")]
    [TestCase("string\nbbb\naaa", "bbb")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}